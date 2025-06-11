import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import personalData from '../data/personalData';
import emailjs from 'emailjs-com';

const ContactForm = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!name.trim()) {
      newErrors.name = 'contact.errorName';
    }
    if (!email.trim() || !validateEmail(email)) {
      newErrors.email = 'contact.errorEmail';
    }
    if (!message.trim()) {
      newErrors.message = 'contact.errorMessage';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        await emailjs.send(
          'service_qlq2dla',
          'template_wxvdnqi', 
          {
            from_name: name,
            from_email: email,
            message,
            to_email: personalData.email
          },
          '3zFhnkG5CiC2pn03G'
        );
        setSuccess(true);
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setSuccess(false), 4000);
      } catch {
        setSuccess(false);
      }
    } else {
      setSuccess(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center gap-2">{t('contact.title')}</h2>
      <p className="text-gray-400 mb-6 text-base md:text-lg">{t('contact.description')}</p>
      <form className="grid gap-4 text-left" onSubmit={handleSubmit} noValidate>
        <div>
          <input
            type="text"
            placeholder={t('contact.nameHint')}
            className="w-full px-3 md:px-4 py-2 rounded bg-[#2a2d34] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          {errors.name && <div className="text-pink-400 text-sm mt-1">{t(errors.name)}</div>}
        </div>
        <div>
          <input
            type="email"
            placeholder={t('contact.emailHint')}
            className="w-full px-3 md:px-4 py-2 rounded bg-[#2a2d34] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errors.email && <div className="text-pink-400 text-sm mt-1">{t(errors.email)}</div>}
        </div>
        <div>
          <textarea
            placeholder={t('contact.messageHint')}
            rows={4}
            className="w-full px-3 md:px-4 py-2 rounded bg-[#2a2d34] text-white focus:outline-none focus:ring-2 focus:ring-pink-500 text-base"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
          {errors.message && <div className="text-pink-400 text-sm mt-1">{t(errors.message)}</div>}
        </div>
        <button type="submit" className="mt-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 px-6 rounded-full hover:opacity-90 transition-transform duration-300 transform hover:scale-105 flex items-center justify-center gap-2 text-base font-bold">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
          </svg>
          <span className="font-bold">{t('contact.submit')}</span>
        </button>
        {success && (
          <div className="text-green-400 text-sm mt-2">{t('contact.successMessage')}</div>
        )}
      </form>
    </>
  );
};

export default ContactForm;