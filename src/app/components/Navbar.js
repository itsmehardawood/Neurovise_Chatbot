'use client';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from '@/lib/translations';


export default function Navbar({ locale = 'en', isAdmin = false, onLogout }) {
  const router = useRouter();
  const [selectedLocale, setSelectedLocale] = useState(locale);
  const t = useTranslation(locale);

  const handleLanguageChange = (lang) => {
    setSelectedLocale(lang);
    router.push(`/${lang}`);
  };

  return (
    <nav className="w-full bg-slate-800 shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-xl font-bold text-blue-600">
        <Link href={`/${selectedLocale}`}>EcoBot</Link>
      </div>

      {/* Right side buttons */}
      <div className="flex items-center space-x-4">
        {/* Admin Panel Button (if admin) */}
        {isAdmin && (
          <Link
            href={`/${selectedLocale}/admin`}
            className="text-sm font-medium text-gray-700 hover:text-blue-600"
          >
            Admin Panel
          </Link>
        )}

        {/* Language Selector */}
        <select
          value={selectedLocale}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="border border-gray-300 rounded-md px-2 py-1 text-sm focus:outline-none"
        >
          <option value="en">English</option>
          <option value="he">עברית</option>
        </select>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm rounded-md transition"
        >
                      {t('logout')}  

        </button>
      </div>
    </nav>
  );
}
