// src/App.tsx
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Clock from './components/Clock';
import LensBlurOverlay from './components/LensBlurOverlay';

function App() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".artist-title", {
      y: 50,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
      delay: 0.5
    })
      .from(".clock-wrapper", {
        scale: 0.8,
        opacity: 0,
        filter: "blur(20px)",
        duration: 2,
        ease: "expo.out"
      }, "-=1");

  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-[#EAEAEA] flex flex-col justify-center items-center overflow-hidden">

      {/* 1. ANA İÇERİK */}
      <div className="z-10 flex flex-col items-center gap-10">

        {/* Başlık */}
        <div className="artist-title text-center">
          <h1 className="text-4xl md:text-5xl font-isidora font-semibold text-[#222] tracking-tight">
            CEM ALTUN
          </h1>
          <p className="mt-2 text-sm font-manrope text-gray-500 tracking-[0.3em] uppercase">
            Composer . Zürich
          </p>
        </div>

        {/* --- SAAT VE SU EFEKTİ BİRLEŞİMİ --- */}
        {/* 'relative' class'ı çok önemli, su efekti buna göre hizalanacak */}
        {/* 'w-[350px] h-[350px]' vererek saatin boyutuna sabitliyoruz ki canvas taşmasın */}
        <div className="clock-wrapper relative w-[262px] h-[262px] md:w-[350px] md:h-[350px]">

          {/* Saat */}
          <Clock />

          {/* Su Katmanı: Artık saatin tam üstünde */}
          <LensBlurOverlay />

        </div>
        {/* ----------------------------------- */}

        <div className="mt-8 text-xs font-mono text-gray-400 opacity-70">
          COMING SOON
        </div>

      </div>

      {/* Arkaplan Gradyanı */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(0,0,0,0.05)] pointer-events-none z-0"></div>
    </div>
  );
}

export default App;
