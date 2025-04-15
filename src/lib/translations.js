import en from "@/app/locales/en";
import he from "@/app/locales/he";


// Store the translations for all available languages
const translations = { en, he };

// The useTranslation hook that returns translated text based on the locale.
export function useTranslation(locale = 'he') {
  // If the provided locale is not available, default to Hebrew
  const t = translations[locale] || translations['he'];

  // Return a function that takes a key and returns the translated text or the key if not found
  return (key) => t[key] || key;
}
