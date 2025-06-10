import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import personalData from '../data/personalData';
import experience from '../data/experience';
import { Experience } from '../types'; // <-- Importa la interfaz
import '../i18n.ts';
import Starfield from '../components/Starfield';
import Header from '../components/Header';
import ProjectCard from '../components/ProjectCard';
import ExperienceCard from '../components/ExperienceCard';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Home() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  if (!mounted) return null; // Evita el render SSR hasta que esté montado

  return (
    <>
      <Starfield />
      <div className="relative z-10 text-white">
        <Header scrolled={scrolled} />
        <div className="h-20 md:h-20"></div>
        <main className="min-h-screen text-gray-100 px-2 md:px-6 py-8 md:py-10 font-mono">
          <section id="inicio" className="scroll-mt-32 max-w-4xl mx-auto text-center">
            <img
              src={personalData.imagenPerfil}
              alt="Foto de perfil"
              width={120}
              height={120}
              className="rounded-full mx-auto mb-4 border-4 border-white w-24 h-24 md:w-32 md:h-32"
            />
            <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">
              {t('greeting')}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                {personalData.nombre}
              </span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 mb-4">
              {t(personalData.bioKey)}
            </p>
            <div className="flex flex-row flex-wrap justify-center gap-3 text-sm">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener"
                className="flex flex-col items-center justify-center gap-1 bg-[#2a2d34] text-white px-4 py-2 rounded-full hover:bg-[#3b3f47] transition basis-[30%] min-w-[100px] text-center md:flex-row md:gap-2 md:px-4 md:py-1 md:basis-auto"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a
                href={personalData.linkedin}
                target="_blank"
                rel="noopener"
                className="flex flex-col items-center justify-center gap-1 bg-[#2a2d34] text-white px-4 py-2 rounded-full hover:bg-[#3b3f47] transition basis-[30%] min-w-[100px] text-center md:flex-row md:gap-2 md:px-4 md:py-1 md:basis-auto"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
              <a
                href={`mailto:${personalData.email}`}
                className="flex flex-col items-center justify-center gap-1 bg-[#2a2d34] text-white px-4 py-2 rounded-full hover:bg-[#3b3f47] transition basis-[30%] min-w-[100px] text-center md:flex-row md:gap-2 md:px-4 md:py-1 md:basis-auto"
              >
                <Mail className="w-4 h-4" />
                Email
              </a>
            </div>
          </section>

          <section id="proyectos" className="scroll-mt-32 mt-16 md:mt-20 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 border-b border-gray-700 pb-2 flex items-center gap-2">
              {t('nav.projects')}
            </h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <ProjectCard
                title="Proyecto 1"
                description="Descripción del proyecto. Tecnologías usadas: React, Tailwind CSS."
                technologies="React, Tailwind CSS"
                imageUrl="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
                githubUrl="https://github.com/tuusuario/proyecto1"
              />
              <ProjectCard
                title="Proyecto 2"
                description="Descripción del proyecto. Tecnologías usadas: Next.js, TypeScript."
                technologies="Next.js, TypeScript"
                imageUrl="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
                githubUrl="https://github.com/tuusuario/proyecto2"
              />
            </div>
          </section>

          <section id="experiencia" className="scroll-mt-32 mt-16 md:mt-20 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 border-b border-gray-700 pb-2 flex items-center gap-2">
              {t('nav.experience')}
            </h2>
            <div className="space-y-6">
              {experience.items.map((exp: Experience, index: number) => (
                <ExperienceCard key={index} exp={exp} />
              ))}
            </div>
          </section>

          <section id="contacto" className="scroll-mt-32 mt-16 md:mt-20 max-w-full md:max-w-3xl mx-auto text-center bg-[#1f1f23]/80 p-4 md:p-8 rounded-2xl shadow-xl border border-gray-800 animate-fade-in">
            <ContactForm />
          </section>
        </main>
        <Footer />
      </div>
      <SpeedInsights />
      <Analytics />
    </>
  );
}