'use client'; // Ensures the component is rendered on the client side

import { Poppins } from 'next/font/google';
import Link from 'next/link';
import { useState } from 'react';


const PoppinsFont = Poppins({
  subsets: ['latin'],
  weight: "400",
  variable: "--font-poppins"
})

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
    } else {
      setError('');
      // Handle form submission logic here (e.g., authenticate the user, call API)
      console.log('Login details:', { email, password });
    }
  };

  

  return (
    <div className={`w-full min-h-screen bg-slate-900 bg-gradient-to-bl from-blue-900 via-transparent to-blue-900 items-center text-black ${PoppinsFont.variable}  `}>
          <h1 className={`font-poppins font-bold text-2xl p-10 text-white `}>Echo</h1>
         <div className={`pt-20 flex justify-center items-center h-full w-full `}>
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h1 className={`text-gray-900 text-2xl py-10 font-bold`}>Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Email"
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
              name="password"
              placeholder="Enter your Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/" className="text-blue-500 hover:text-blue-700">Sign up</Link>
        </p>
      </div>
    </div>
    </div>
   
  );
}
