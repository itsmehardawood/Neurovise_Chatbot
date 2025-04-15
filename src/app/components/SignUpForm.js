'use client';

import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/translations'; 

const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-poppins',
});

export default function SignUpForm({ locale }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const router = useRouter();
  const t = useTranslation(locale);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError(t('passwordMismatch'));
      return;
    }

    try {
      const response = await fetch('https://ecochatbot-production.up.railway.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(t('signupSuccess'));
        setError('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setTimeout(() => {
          router.push(`/${locale}/login`);
        }, 1500); // 👈 1.5s delay before redirect
      } else {
        setError(data.detail || t('signupError'));
        setSuccessMessage('');
      }
    } catch (error) {
      setError(t('signupError'));
      setSuccessMessage('');
    }
  };

  return (
    <div className={`${PoppinsFont.variable} flex justify-center w-full min-h-screen items-center text-black`}>
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h1 className="font-poppins text-gray-900 text-2xl py-5 font-bold">
          {t('signupTitle')}
        </h1>

        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t('email')}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder={t('emailPlaceholder')}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t('password')}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder={t('passwordPlaceholder')}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {t('confirmPassword')}
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder={t('confirmPasswordPlaceholder')}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {t('signUp')}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {t('alreadyHaveAccount')}{' '}
          <Link href={`/${locale}`} className="text-blue-500 hover:text-blue-700">
            {t('loginLink')}
          </Link>
        </p>
      </div>
    </div>
  );
}
