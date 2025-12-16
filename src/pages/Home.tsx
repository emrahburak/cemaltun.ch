import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { useTheme } from "../context/ThemeContext"; // Home içinde direkt kullanmıyoruz artık, IntroTrigger kullanıyor.
import { usePageTheme } from "../hooks/usePageTheme";

import Hero from "../components/Hero";
import Overlay from "../components/Overlay";
import Navbar from "../components/Navbar";
import CinematicIntro from "../components/CinematicIntro";
import About from "../components/About";
import Works from "../components/Works";
import Contact from "../components/Contact";

// Eğer main.tsx'te register ettiysen burayı silebilirsin. Etmediysen kalsın.
gsap.registerPlugin(ScrollTrigger, useGSAP);

// --- YARDIMCI BİLEŞEN: IntroTrigger ---
// Hero ve Intro Scene boyunca (ilk 200vh) Navbar'ı BEYAZ tutar.
const IntroTrigger = () => {
  // TRUE gönderiyoruz: Burası karanlık bölge (Navbar BEYAZ)
  const ref = usePageTheme(true);

  // absolute ve pointer-events-none ile akışı bozmaz, sadece tetikleyici olarak durur.
  return <div ref={ref as any} className="w-full h-[200vh] absolute top-0 left-0 -z-10 pointer-events-none" />;
};

const Home = () => {
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);

  useGSAP(() => {

    // 1. Navbar Kilitleme Mekaniği (CinematicIntro için)
    ScrollTrigger.create({
      trigger: "body",
      start: "100vh top",
      onEnter: () => setIsNavbarFixed(true),
      onLeaveBack: () => setIsNavbarFixed(false),
    });

    // 2. GSAP FULL-SCREEN SNAP (SAYFALAMA) MEKANİĞİ
    if (sectionsContainerRef.current) {

      // Container içindeki TÜM elemanları al
      const allChildren = gsap.utils.toArray(sectionsContainerRef.current.children) as HTMLElement[];

      // FİLTRELEME: Sadece 'SECTION' etiketine sahip olanları al.
      // Böylece 'div' olan IntroTrigger'a snap yapmaya çalışmaz.
      const sections = allChildren.filter(child => child.tagName === "SECTION");

      if (sections.length > 0) {
        ScrollTrigger.create({
          trigger: sectionsContainerRef.current,
          start: "top top",
          end: "bottom bottom",

          snap: {
            snapTo: sections, // Sadece filtrelenmiş bölümlere kilitlen
            duration: { min: 0.5, max: 0.8 },
            delay: 0,
            ease: "power2.inOut"
          } as any,
        });
      }
    }

  }, { scope: sectionsContainerRef });


  return (
    <div className="relative">

      {/* 1. SABİT KATMANLAR */}
      <Hero />
      <CinematicIntro trigger={isNavbarFixed} />

      {/* 2. SCROLL AKIŞ KATMANI */}
      <div className="relative z-10">

        <Overlay />

        {/* Navbar rengini artık kendi içindeki hook ile Context'ten alıyor */}
        <Navbar />

        {/* BÖLÜMLER KONTEYNERİ */}
        <div ref={sectionsContainerRef} className="relative">

          {/* GİZLİ TETİKLEYİCİ: Navbar rengini korumak için (Snap'e dahil edilmez) */}
          <IntroTrigger />

          {/* 1. SAHNE: Intro Scene (Boşluk) */}
          <section id="intro-scene" className="w-full h-[200vh] bg-transparent pointer-events-none"></section>

          {/* 2. SAHNE: About (Navbar SİYAH olur) */}
          <About />

          {/* 3. SAHNE: Works (Navbar SİYAH olur) */}
          <Works />

          {/* 4. SAHNE: Contact (Navbar SİYAH olur) */}
          <Contact />

        </div>
      </div>
    </div>
  );
};

export default Home;
