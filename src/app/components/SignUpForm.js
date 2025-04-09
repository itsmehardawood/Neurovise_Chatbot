'use client'; // Ensures the component is rendered on the client side
import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';

const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: "400",
  variable: "--font-poppins"
})

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // New state for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/signup", {
        method: "POST", 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        setSuccessMessage("Account created successfully! Please log in.");
        setError(''); // Clear any previous errors
        setEmail(''); // Clear the email field
        setPassword(''); // Clear the password field
        setConfirmPassword(''); // Clear the confirm password field
      } else {
        setError(data.detail);
        setSuccessMessage(''); // Clear success message if there's an error
      }
    } catch (error) {
      setError("Something went wrong");
      setSuccessMessage(''); // Clear success message if there's an error
    }
  };

  return (
    <div className={` ${PoppinsFont.variable} flex justify-center w-full min-h-screen items-center text-black`}>
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h1 className={`font-poppins text-gray-900 text-2xl py-5 font-bold`}>Create an account</h1>

        {/* Show success message if user is created */}
        {successMessage && (
          <p className="text-green-500 text-sm mb-4">{successMessage}</p>
        )}

        {/* Show error message if any error occurs */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder='Enter your Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder='Enter your Password'
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder='Confirm your Password'
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
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/" className="text-blue-500 hover:text-blue-700">Log in</Link>
        </p>
      </div>
    </div>
  );
}
