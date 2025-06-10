import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './LanguageSelector';

interface HeaderProps {
  scrolled: boolean;
}

const Header: React.FC<HeaderProps> = ({ scrolled }) => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evita el render hasta que esté montado en cliente

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'backdrop-blur-sm' : ''}`}>
      <nav className="max-w-4xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-white py-3 px-2 md:px-4 gap-2 md:gap-0">
        <div className="flex-1"></div>
        <div className="flex gap-6 justify-center">
          <a href="#inicio" className="hover:text-pink-400 transition">{t('nav.home')}</a>
          <a href="#proyectos" className="hover:text-pink-400 transition">{t('nav.projects')}</a>
          <a href="#experiencia" className="hover:text-pink-400 transition">{t('nav.experience')}</a>
          <LanguageSelector />
        </div>
        <div className="flex-1 flex justify-end">
          <a href="#contacto" className="inline-block bg-[#4f46e5] hover:bg-[#4338ca] text-white text-base md:text-sm font-bold px-4 md:px-5 py-2 rounded-full shadow-md transition transform hover:scale-105">{t('contact.shortcut')}</a>
        </div>
      </nav>
    </header>
  );
};

export default Header;