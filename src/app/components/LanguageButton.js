'use client';

import { useRouter, usePathname, useParams } from 'next/navigation';

const LanguageButton = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { locale } = useParams();

  const toggleLocale = locale === 'he' ? 'en' : 'he';

  const switchLanguage = () => {
    const segments = pathname.split('/');
    segments[1] = toggleLocale;
    const newPath = segments.join('/');
    router.push(newPath);
  };

  const labels = {
    en: 'עברית',
    he: 'English',
  };

  return (
    <button
      onClick={switchLanguage}
      className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      {labels[locale] || 'Switch'}
    </button>
  );
};

export default LanguageButton;
