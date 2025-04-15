'use client';

import { useRouter } from 'next/navigation';

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear token or session
    localStorage.removeItem('access_token');

    // Redirect to login
    router.push('/login');
  };

  return (
    <div className="fixed top-15 right-4 z-50">
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 shadow-md transition"
      >
        Logout
      </button>
    </div>
  );
}
