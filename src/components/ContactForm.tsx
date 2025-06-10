import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

const ContactForm = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">{t('contact.title')}</h2>
      <p className="text-gray-400 mb-6 text-base md:text-lg">{t('contact.description')}</p>
      <form className="grid gap-4 text-left">
        <input type="text" placeholder={t('contact.nameHint')} className="w-full px-3 md:px-4 py-2 rounded bg-[#2a2d34] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-base" />
        <input type="email" placeholder={t('contact.emailHint')} className="w-full px-3 md:px-4 py-2 rounded bg-[#2a2d34] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-base" />
        <textarea placeholder={t('contact.messageHint')} rows={4} className="w-full px-3 md:px-4 py-2 rounded bg-[#2a2d34] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"></textarea>
        <button type="submit" className="mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-full hover:opacity-90 transition-transform duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-base font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="font-bold">{t('contact.submit')}</span>
        </button>
      </form>
    </>
  );
};

export default ContactForm;