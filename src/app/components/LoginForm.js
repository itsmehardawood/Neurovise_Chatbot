'use client'; // Ensures the component is rendered on the client side
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Success:", data);
        setSuccessMessage("Welcome back! You have logged in successfully.");
        setError(''); // Clear any previous error message
        // Optional: Redirect after displaying success message
        setTimeout(() => {
          router.push('/business-service');
        }, 2000); // Redirect after 2 seconds
      } else {
        setError(data.detail);
        setSuccessMessage(''); // Clear success message if there's an error
      }
    } catch (err) {
      setError("Login failed. Please try again.");
      setSuccessMessage(''); // Clear success message if there's an error
    }
  };

  return (
    <div className={`pt-20 flex justify-center items-center h-full w-full text-black`}>
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h1 className={`text-gray-900 text-2xl py-10 font-bold`}>Log in</h1>

        {/* Show success message if login is successful */}
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

          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Log In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-500 hover:text-blue-700">Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
