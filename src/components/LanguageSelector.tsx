import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const languageToCountry: Record<string, string> = {
  en: 'gb',
  es: 'es'
};

function getFlagUrl(lang: string) {
  const countryCode = languageToCountry[lang] || 'es';
  return `https://flagcdn.com/w20/${countryCode}.png`;
}

export default function LanguageSelector() {
  const { i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setOpen(false);
  };

  const languages = Object.keys(languageToCountry);
  const currentLang = i18n.language;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center gap-2 px-3 py-1 text-white bg-transparent hover:text-pink-400 transition"
      >
        <img
          src={getFlagUrl(currentLang)}
          alt={currentLang}
          className="w-6 h-4 rounded"
        />
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-[#2a2d34] border border-gray-700 rounded shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => changeLanguage(lang)}
              className="flex items-center w-full px-3 py-2 text-sm text-white hover:bg-[#3b3f47] transition"
            >
              <img
                src={getFlagUrl(lang)}
                alt={lang}
                className="w-6 h-4 rounded mr-2"
              />
              {lang.toUpperCase()}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
