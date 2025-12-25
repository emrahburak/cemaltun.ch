import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

// Bileşenlerin
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import About from "../components/About";
import Works from "../components/Works";
import Contact from "../components/Contact";
import GallerySlide from "../components/GallerySlide";
import MobileGallerySlide from "../components/MobileGallerySlide";

// Resimlerin
import g1 from "@/assets/images/gallery/webp/cem-altun-gallery-01.webp";
import g2 from "@/assets/images/gallery/webp/cem-altun-gallery-02.webp";
import g3 from "@/assets/images/gallery/webp/cem-altun-gallery-03.webp";
import g4 from "@/assets/images/gallery/webp/cem-altun-gallery-04.webp";

gsap.registerPlugin(Observer);

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();
  const images = [g1, g2, g3, g4];

  // Logic Refs: Animasyonun beyni (Render tetiklemez, akışı korur)
  const currentIndex = useRef(0);
  const animating = useRef(false);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionIds = ["hero", "about", "works", "gallery", "contact"];

  // --- ANA GEÇİŞ FONKSİYONU ---
  const gotoSection = (index: number, direction: number) => {
    if (animating.current || index < 0 || index >= sectionIds.length) return;

    animating.current = true;
    const isNext = direction > 0;
    const currentSection = sectionsRef.current[currentIndex.current];
    const nextSection = sectionsRef.current[index];

    const tl = gsap.timeline({
      onComplete: () => {
        animating.current = false;
        currentIndex.current = index;
      }
    });

    if (isNext) {
      // İLERİ GEÇİŞ (Perde alttan gelir)
      tl.set(nextSection, { zIndex: 10, autoAlpha: 1 });
      tl.fromTo(nextSection,
        { yPercent: 100, clipPath: "inset(100% 0% 0% 0%)" },
        { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" }
      );
      tl.set(currentSection, { autoAlpha: 0, zIndex: 0 }, ">");
    } else {
      // GERİ GEÇİŞ (Mevcut perde aşağı iner)
      tl.set(nextSection, { zIndex: 5, autoAlpha: 1, yPercent: 0, clipPath: "inset(0% 0% 0% 0%)" });
      tl.set(currentSection, { zIndex: 10 });
      tl.to(currentSection, {
        yPercent: 100, clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut"
      });
      tl.set(currentSection, { autoAlpha: 0 }, ">");
    }
  };

  // --- INITIAL SETUP & OBSERVER ---
  useGSAP(() => {
    // Katmanların başlangıç pozisyonlarını netleştir
    gsap.set(sectionsRef.current, {
      position: "fixed",
      inset: 0,
      autoAlpha: 0,
      zIndex: 0,
      yPercent: 0
    });

    // Sadece Hero'yu göster
    gsap.set(sectionsRef.current[0], { autoAlpha: 1, zIndex: 1 });

    const observer = Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onDown: () => !animating.current && currentIndex.current > 0 && gotoSection(currentIndex.current - 1, -1),
      onUp: () => !animating.current && currentIndex.current < sectionIds.length - 1 && gotoSection(currentIndex.current + 1, 1),
      tolerance: 50,
      preventDefault: true
    });

    return () => observer.kill();
  }, { scope: mainRef });

  // Sidebar Navigasyon Desteği
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const targetIndex = sectionIds.indexOf(targetId);
      if (targetIndex !== -1 && targetIndex !== currentIndex.current) {
        gotoSection(targetIndex, targetIndex > currentIndex.current ? 1 : -1);
      }
    }
  }, [hash]);

  return (
    <div ref={mainRef} className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-black">
      <Sidebar />

      {/* Hero */}
      <div ref={el => { sectionsRef.current[0] = el; }} className="absolute inset-0 flex items-center justify-center overflow-hidden bg-black" id="hero">
        <Hero active={true} />
      </div>

      {/* About */}
      <div ref={el => { sectionsRef.current[1] = el; }} className="absolute inset-0 flex items-center justify-center bg-[#f5f5f5] overflow-hidden" id="about">
        <About active={true} />
      </div>

      {/* Works */}
      <div ref={el => { sectionsRef.current[2] = el; }} className="absolute inset-0 flex items-center justify-center bg-[#f5f5f5] overflow-hidden" id="works">
        <Works active={true} />
      </div>

      {/* Gallery */}
      <div ref={el => { sectionsRef.current[3] = el; }} className="absolute inset-0 flex items-center justify-center bg-black overflow-hidden" id="gallery">
        <div className="w-full h-full lg:block hidden">
          <GallerySlide images={images} active={true} />
        </div>
        <div className="w-full h-full lg:hidden block">
          <MobileGallerySlide images={images} active={true} />
        </div>
      </div>

      {/* Contact */}
      <div ref={el => { sectionsRef.current[4] = el; }} className="absolute inset-0 flex items-center justify-center bg-[#f5f5f5] overflow-hidden" id="contact">
        <Contact active={true} />
      </div>
    </div>
  );
};

export default Home;
