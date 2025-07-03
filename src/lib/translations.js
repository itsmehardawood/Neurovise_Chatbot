import en from "@/app/locales/en";
import ar from "@/app/locales/ar";


// Store the translations for all available languages
const translations = { en, ar };

// The useTranslation hook that returns translated text based on the locale.
export function useTranslation(locale = 'en') {
  // If the provided locale is not available, default to arabic
  const t = translations[locale] || translations['en'];

  // Return a function that takes a key and returns the translated text or the key if not found
  return (key) => t[key] || key;
}
