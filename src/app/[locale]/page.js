'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from '@/lib/translations';
import BackButton from '../components/BackButton';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();
  const params = useParams(); // get dynamic params from the route
  const locale = params?.locale || 'he'; // default fallback
  const t = useTranslation(locale);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    if (!token) {
      router.push(`/${locale}/login`);
    } else {
      setLoading(false);
    }
  }, [locale, router]);

  if (loading) return <p>{t('loading')}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 text-white flex flex-col justify-center items-center gap-6 p-6 relative">
      <BackButton />
              <Image src="/images/logo.png" height="300" width="300" alt="this is our logo" priority  />
      
      <h1 className="text-4xl font-bold mb-6 drop-shadow">{t('welcome')}</h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <button
          onClick={() => router.push(`/${locale}/chatbot-widget`)}
          className="w-full px-6 py-3 rounded-2xl bg-purple-600 hover:bg-purple-700 transition duration-300 shadow-md"
        >
          {t('goToChatbot')}
        </button>

        <button
          onClick={() => router.push(`/${locale}/business-service`)}
          className="w-full px-6 py-3 rounded-2xl bg-blue-600 hover:bg-blue-700 transition duration-300 shadow-md"
        >
          {t('manageBusiness')}
        </button>
      </div>
    </div>
  );
}
