import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { HeroAperture } from './components/HeroAperture';
import { PactimeDarkroom } from './components/PactimeDarkroom';
import { MellowfinGallery } from './components/MellowfinGallery';
import { EditorialArchive } from './components/EditorialArchive';
import { MonumentalFooter } from './components/MonumentalFooter';

const NAV_ITEMS = [
  { id: 'cover', label: '关于' },
  { id: 'pactime', label: 'Pactime' },
  { id: 'mellowfin', label: '专注鱼鱼' },
  { id: 'archive', label: '开源' },
  { id: 'contact', label: '联系' },
] as const;

const SECTION_IDS = ['cover', 'pactime', 'mellowfin', 'archive', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState('cover');

  // Lenis inertial smooth scroll
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Track active section for clean navigation underline/opacity
  useEffect(() => {
    let rafId = 0;

    const update = () => {
      const midY = window.innerHeight * 0.45;
      for (let i = SECTION_IDS.length - 1; i >= 0; i--) {
        const el = document.getElementById(SECTION_IDS[i]);
        if (el && el.getBoundingClientRect().top <= midY) {
          setActiveSection(SECTION_IDS[i]);
          break;
        }
      }
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Weightless mix-blend-difference Header — Zero Gadgets, Pure Brand & Nav */}
      <header className="pointer-events-none fixed top-0 right-0 left-0 z-40 mix-blend-difference">
        <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-6 text-white sm:px-12 lg:px-16">
          <a
            href="#cover"
            className="pointer-events-auto font-serif-editorial text-[24px] leading-none italic tracking-tight text-white no-underline"
          >
            Vergil
          </a>

          <nav
            aria-label="主导航"
            className="pointer-events-auto flex items-center gap-6 sm:gap-8"
          >
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`text-[13px] transition-opacity duration-200 ${
                    active ? 'font-medium opacity-100' : 'opacity-55 hover:opacity-100'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>
        </div>
      </header>

      <main>
        <HeroAperture />
        <PactimeDarkroom />
        <MellowfinGallery />
        <EditorialArchive />
      </main>

      <MonumentalFooter />
    </div>
  );
}
