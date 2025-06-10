import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import personalData from '../data/personalData';

const Footer = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="text-center text-gray-500 text-xs md:text-sm py-6 border-t border-gray-800">
      <p>&copy; {new Date().getFullYear()} {personalData.nombre}. {t('nav.footer.rights')}</p>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-2">
        <a href="#inicio" className="hover:text-pink-400 transition">{t('nav.home')}</a>
        <a href="#proyectos" className="hover:text-pink-400 transition">{t('nav.projects')}</a>
        <a href="#experiencia" className="hover:text-pink-400 transition">{t('nav.experience')}</a>
        <a href="#contacto" className="hover:text-pink-400 transition">{t('nav.contact')}</a>
      </div>
    </footer>
  );
};

export default Footer;