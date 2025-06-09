import { useEffect, useState, useRef } from 'react';
import { Github, Linkedin, Mail, Briefcase, Folder } from 'lucide-react';
import personalData from '../data/personalData';
import experience from '../data/experience';
import { useTranslation } from 'react-i18next';
import '../i18n.ts';
import LanguageSelector from '../components/LanguageSelector';
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"


const STAR_COUNT = 120;
const STAR_COLOR = "#fff";
const STAR_SIZE = 1.2;
const STAR_SPEED = 0.15;

function randomBetween(a: number, b: number) {
  return a + Math.random() * (b - a);
}

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useRef<{ x: number; y: number; z: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
    }

    // Inicializa estrellas
    stars.current = Array.from({ length: STAR_COUNT }, () => ({
      x: randomBetween(0, width),
      y: randomBetween(0, height),
      z: randomBetween(0.2, 1),
    }));

    function draw() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      for (const star of stars.current) {
        ctx.globalAlpha = star.z;
        ctx.beginPath();
        ctx.arc(star.x, star.y, STAR_SIZE * star.z, 0, 2 * Math.PI);
        ctx.fillStyle = STAR_COLOR;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    function update() {
      for (const star of stars.current) {
        star.x += STAR_SPEED * star.z * 2;
        if (star.x > width) {
          star.x = 0;
          star.y = randomBetween(0, height);
          star.z = randomBetween(0.2, 1);
        }
      }
    }

    let animationId: number;
    function animate() {
      update();
      draw();
      animationId = requestAnimationFrame(animate);
    }

    animate();

    // Resize handler
    function handleResize() {
      width = window.innerWidth;
      height = window.innerHeight;
      if (canvas) {
        canvas.width = width;
        canvas.height = height;
      }
    }
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default function Home() {
  const { t } = useTranslation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.documentElement.classList.add('dark');
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  useEffect(() => {
    const anchors = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    const listeners: { anchor: HTMLAnchorElement; handler: (e: MouseEvent) => void }[] = [];

    anchors.forEach(anchor => {
      const handler = (e: MouseEvent) => {
        const href = anchor.getAttribute('href');
        if (href && href.startsWith('#')) {
          const target = document.querySelector(href);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      };
      anchor.addEventListener('click', handler);
      listeners.push({ anchor, handler });
    });

    return () => {
      listeners.forEach(({ anchor, handler }) => {
        anchor.removeEventListener('click', handler);
      });
    };
  }, []);

  return (
    <>
      <Starfield />
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${scrolled ? 'backdrop-blur-sm' : ''
          }`}
      >
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
      <div className="h-20 md:h-20"></div>
      {/* Añade relative y z-10 aquí */}
      <div className="min-h-screen text-white relative z-10">
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
              {t('greeting')}<span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">{personalData.nombre}</span>
            </h1>
            <p className="text-base md:text-lg text-gray-400 mb-4">
              {t(personalData.bioKey)}
            </p>
            <div className="flex flex-row flex-wrap justify-center gap-3 text-sm">
              <a
                href={personalData.github}
                target="_blank"
                rel="noopener"
                className="flex flex-col items-center justify-center gap-1 bg-[#2a2d34] text-white px-4 py-2 rounded-full hover:bg-[#3b3f47] transition basis-[30%] min-w-[100px] text-center md:flex-row md:gap-2 md:px-4 md:py-1 md:basis-auto">
                <Github className="w-4 h-4 text-white" />
                GitHub
              </a>
              <a href={personalData.linkedin} target="_blank"
                rel="noopener"
                className="flex flex-col items-center justify-center gap-1 bg-[#2a2d34] text-white px-4 py-2 rounded-full hover:bg-[#3b3f47] transition basis-[30%] min-w-[100px] text-center md:flex-row md:gap-2 md:px-4 md:py-1 md:basis-auto">
                <Linkedin className="w-4 h-4 text-white" /> LinkedIn
              </a>
              <a href={"mailto:" + personalData.email} target="_blank"
                rel="noopener"
                className="flex flex-col items-center justify-center gap-1 bg-[#2a2d34] text-white px-4 py-2 rounded-full hover:bg-[#3b3f47] transition basis-[30%] min-w-[100px] text-center md:flex-row md:gap-2 md:px-4 md:py-1 md:basis-auto">
                <Mail className="w-4 h-4 text-white" /> Email
              </a>
            </div>
          </section>

          <section id="proyectos" className="scroll-mt-32 mt-16 md:mt-20 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 border-b border-gray-700 pb-2 flex items-center gap-2">
              <Folder className="w-6 h-6" /> {t('nav.projects')}
            </h2>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
              <div className="bg-[#1f2125] border border-gray-700 rounded-xl p-4 md:p-5 shadow-md hover:shadow-lg transition">
                <img
                  src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80"
                  alt="Coding workspace"
                  className="w-full h-40 object-cover rounded-md mb-4"
                />
                <h3 className="text-lg md:text-xl font-bold text-white">Proyecto 1</h3>
                <p className="text-sm text-gray-400 mt-2">Descripción del proyecto. Tecnologías usadas: React, Tailwind CSS.</p>
                <a href="https://github.com/tuusuario/proyecto1" className="text-sm text-white mt-3 inline-block hover:underline">Ver en GitHub</a>
              </div>
              <div className="bg-[#1f2125] border border-gray-700 rounded-xl p-4 md:p-5 shadow-md hover:shadow-lg transition">
                <img src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=800&q=80" alt="Proyecto 2" className="w-full h-36 md:h-40 object-cover rounded-md mb-4" />
                <h3 className="text-lg md:text-xl font-bold text-white">Proyecto 2</h3>
                <p className="text-sm text-gray-400 mt-2">Descripción del proyecto. Tecnologías usadas: Next.js, TypeScript.</p>
                <a href="https://github.com/tuusuario/proyecto2" className="text-sm text-white mt-3 inline-block hover:underline">Ver en GitHub</a>
              </div>
            </div>
          </section>

          <section id="experiencia" className="scroll-mt-32 mt-16 md:mt-20 max-w-4xl mx-auto">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 border-b border-gray-700 pb-2 flex items-center gap-2">
              <Briefcase className="w-6 h-6" /> {t('nav.experience')}
            </h2>
            <div className="space-y-6">
              {experience.items.map((exp, index) => (
                <div
                  key={index}
                  className="bg-[#1f2125] border border-gray-700 rounded-xl p-5 shadow-md"
                >
                  <h3 className="text-xl font-bold text-white">{t(exp.titleKey)}</h3>
                  <p className="text-sm text-gray-400 mt-1 italic">{t(exp.durationKey)}</p>
                  <p className="text-sm text-gray-300 mt-2">{t(exp.descriptionKey)}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="contacto" className="scroll-mt-32 mt-16 md:mt-20 max-w-full md:max-w-3xl mx-auto text-center bg-[#1f1f23] p-4 md:p-8 rounded-2xl shadow-xl border border-gray-800 animate-fade-in">
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
          </section>
        </main>
        <footer className="text-center text-gray-500 text-xs md:text-sm py-6 border-t border-gray-800">
          <p>&copy; {new Date().getFullYear()} {personalData.nombre}. {t('nav.footer.rights')}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mt-2">
            <a href="#inicio" className="hover:text-pink-400 transition">{t('nav.home')}</a>
            <a href="#proyectos" className="hover:text-pink-400 transition">{t('nav.projects')}</a>
            <a href="#experiencia" className="hover:text-pink-400 transition">{t('nav.experience')}</a>
            <a href="#contacto" className="hover:text-pink-400 transition">{t('nav.contact')}</a>
          </div>
        </footer>
      </div>
      <SpeedInsights />
      <Analytics />
    </>
  );
}
