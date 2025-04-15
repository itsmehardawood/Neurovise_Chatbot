'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useTranslation } from '@/lib/translations';

function LoginForm({ locale = 'he' }) {
  const t = useTranslation(locale);
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError([t('error.requiredFields')]);
      return;
    }

    try {
      const formBody = new URLSearchParams();
      formBody.append('username', email); // ✅ use 'username' for FastAPI OAuth2
      formBody.append('password', password);
      formBody.append('grant_type', 'password'); // ✅ optional, but standard

      const response = await fetch('https://93d8-103-225-221-165.ngrok-free.app/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok) {
        localStorage.setItem('access_token', data.access_token);

        setSuccessMessage(t('Successful log in Welcome Back'));
        setError(null);

        setTimeout(() => {
          router.push(`/${locale}`);
        }, 2000);
      } else {
        if (Array.isArray(data.detail)) {
          const messages = data.detail.map((err) => err.msg);
          setError(messages);
        } else {
          setError([data.detail || t('error.loginFailed')]);
        }
        setSuccessMessage('');
      }
    } catch (err) {
      setError([t('error.generic')]);
      setSuccessMessage('');
    }
  };

  return (
    <div className={`pt-20 flex justify-center items-center h-full w-full text-black ${locale === 'he' ? 'rtl' : 'ltr'}`}>
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h1 className="text-gray-900 text-2xl py-10 font-bold">{t('login')}</h1>

        {successMessage && <p className="text-green-500 text-sm mb-4">{successMessage}</p>}
        {error && error.map((msg, index) => (
          <p key={index} className="text-red-500 text-sm mb-2">{msg}</p>
        ))}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('email')}</label>
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
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">{t('password')}</label>
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            {t('loginButton')}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          {t('noAccount')}{' '}
          <Link href={`/${locale}/signup`} className="text-blue-500 hover:text-blue-700">
            {t('signup')}
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
