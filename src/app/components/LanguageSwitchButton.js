// components/LanguageSwitchButton.js
'use client';

import { usePathname, useRouter, useParams } from 'next/navigation';

const LanguageSwitchButton = () => {
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

  return (
    <button
      onClick={switchLanguage}
      className="fixed top-4 right-4 z-50 px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
    >
      {locale === 'he' ? 'English' : 'עברית'}
    </button>
  );
};

export default LanguageSwitchButton;
