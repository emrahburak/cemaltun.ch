import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import Hero from "../components/Hero";
import Overlay from "../components/Overlay";
import Navbar from "../components/Navbar";
import CinematicIntro from "../components/CinematicIntro";
import About from "../components/About";
import Works from "../components/Works";
import Contact from "../components/Contact";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Home = () => {
  // State: Navbar'ın tepeye kilitlendiğini izler.
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  // Ref: Full-screen bölümleri içeren konteyneri yakalar.
  const sectionsContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {

    // --- NAVBAR KİLİTLEME MEKANİĞİ ---
    // Overlay (100vh) bitince isNavbarFixed state'ini true yapar.
    ScrollTrigger.create({
      trigger: "body",
      start: "100vh top", // Perde (Overlay) yüksekliği bittiği an.
      onEnter: () => setIsNavbarFixed(true), // Navbar kilitlendi
      onLeaveBack: () => setIsNavbarFixed(false), // Navbar serbest kaldı
    });

    // --- GSAP FULL-SCREEN PAGING (SAYFALAMA) MEKANİĞİ ---

    // 1. Tip Dönüşümü: Elemanların bir Element dizisi olduğunu belirtiyoruz.
    const sections = gsap.utils.toArray(
      sectionsContainerRef.current?.children || []
    ) as Element[];

    if (sections.length === 0) return;

    // 2. ScrollTrigger'ı yarat.
    ScrollTrigger.create({
      trigger: sectionsContainerRef.current,
      start: "top top", // Konteyner başladığında
      end: "bottom bottom", // Konteyner bittiğinde

      snap: {
        snapTo: sections, // Bölümlere kilitlen
        duration: { min: 0.5, max: 0.8 },
        delay: 0,
        ease: "power2.inOut"
      } as any, // TypeScript hata çözümü için 'as any'
    });

  }, { scope: sectionsContainerRef });


  return (
    <div className="relative">

      {/* 1. SABİT ARKA PLAN */}
      <Hero />

      {/* 2. SABİT SİNEMATİK YAZI */}
      {/* isNavbarFixed prop'u burada kullanılıyor, TS uyarısını kaldırır. */}
      <CinematicIntro trigger={isNavbarFixed} />

      {/* 3. SCROLL AKIŞI (Z-10) */}
      <div className="relative z-10">

        {/* A) Perde (100vh) */}
        <Overlay />

        {/* B) Menü (Sticky) */}
        <Navbar />

        {/* C) BÖLÜM KONTEYNERİ */}
        {/* Navbar'dan sonraki tüm h-screen bölümleri bu container içinde */}
        <div ref={sectionsContainerRef}>

          {/* 1. SAHNE: NET RESİM ALANI (h-screen) */}
          {/* CinematicIntro belirdikten sonra kullanıcının scroll yapmaya devam etmesi için alan */}
          <section id="intro-scene" className="w-full h-screen bg-transparent"></section>

          {/* 2. BÖLÜMLER (Hepsi h-screen) */}
          <About />
          <Works />
          <Contact />

        </div>
      </div>
    </div>
  );
};

export default Home;
