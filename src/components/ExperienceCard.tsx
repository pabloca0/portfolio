import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';

interface Experience {
  titleKey: string;
  durationKey: string;
  descriptionKey: string;
}

interface ExperienceCardProps {
  exp: Experience;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp }) => {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="bg-[#1f2125]/80 border border-gray-700 rounded-xl p-5 shadow-md">
      <h3 className="text-xl font-bold text-white">{t(exp.titleKey)}</h3>
      <p className="text-sm text-gray-400 mt-1 italic">{t(exp.durationKey)}</p>
      <p className="text-sm text-gray-300 mt-2">{t(exp.descriptionKey)}</p>
    </div>
  );
};

export default ExperienceCard;