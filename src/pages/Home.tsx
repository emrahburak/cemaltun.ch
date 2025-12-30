import { useRef, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Observer } from "gsap/Observer";

// Bileşenlerin
import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import DesktopWorks from "../components/DesktopWorks";
import MobileWorks from "../components/MobileWorks";
import Contact from "../components/Contact";
import GallerySlide from "../components/GallerySlide";
import MobileGallerySlide from "../components/MobileGallerySlide";

// Resimlerin
import g1 from "@/assets/images/gallery/webp/cem-altun-gallery-01.webp";
import g2 from "@/assets/images/gallery/webp/cem-altun-gallery-02.webp";
import g3 from "@/assets/images/gallery/webp/cem-altun-gallery-03.webp";
import g4 from "@/assets/images/gallery/webp/cem-altun-gallery-04.webp";
import MobileAbout from "../components/MobileAbout";
import DesktopAbout from "../components/DesktopAbout";
import Langs from "../components/Langs";

gsap.registerPlugin(Observer);

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();
  const images = [g1, g2, g3, g4];

  // --- STATE & REFS ---
  const [activeIndex, setActiveIndex] = useState(0); // React'in arayüzü güncellemesi için
  const currentIndex = useRef(0); // GSAP'in takibi için (Ref her zaman güncel kalır)
  const animating = useRef(false);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionIds = ["hero", "about", "works", "gallery", "contact"];

  // --- ANA GEÇİŞ FONKSİYONU (TAM HALİ) ---
  const gotoSection = (index: number, direction: number) => {
    // Sınır kontrolü ve animasyon kilidi
    if (animating.current || index < 0 || index >= sectionIds.length) return;

    animating.current = true;
    const isNext = direction > 0;
    const currentSection = sectionsRef.current[currentIndex.current];
    const nextSection = sectionsRef.current[index];

    const tl = gsap.timeline({
      onComplete: () => {
        animating.current = false;
        currentIndex.current = index; // Ref'i güncelle (lojik akış)
        setActiveIndex(index); // State'i güncelle (React Re-render - Alt bileşenleri tetikler)
      }
    });

    if (isNext) {
      // İLERİ GEÇİŞ (Yeni perde alttan gelir)
      tl.set(nextSection, { zIndex: 10, autoAlpha: 1 });
      tl.fromTo(nextSection,
        { yPercent: 100, clipPath: "inset(100% 0% 0% 0%)" },
        { yPercent: 0, clipPath: "inset(0% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut" }
      );
      tl.set(currentSection, { autoAlpha: 0, zIndex: 0 }, ">");
    } else {
      // GERİ GEÇİŞ (Mevcut perde aşağı iner, altındaki görünür)
      tl.set(nextSection, { zIndex: 5, autoAlpha: 1, yPercent: 0, clipPath: "inset(0% 0% 0% 0%)" });
      tl.set(currentSection, { zIndex: 10 });
      tl.to(currentSection, {
        yPercent: 100, clipPath: "inset(100% 0% 0% 0%)", duration: 1.2, ease: "power4.inOut"
      });
      tl.set(currentSection, { autoAlpha: 0, zIndex: 0 }, ">");
    }
  };

  // --- INITIAL SETUP & OBSERVER ---
  useGSAP(() => {
    gsap.set(sectionsRef.current, {
      position: "fixed",
      inset: 0,
      autoAlpha: 0,
      zIndex: 0,
      yPercent: 0
    });

    // Başlangıçta ilk bölümü göster
    gsap.set(sectionsRef.current[0], { autoAlpha: 1, zIndex: 1 });

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1.5, // Masaüstü için ters yön düzeltmesi
      tolerance: 5,
      dragMinimum: 50,

      onUp: () => {
        if (!animating.current) gotoSection(currentIndex.current + 1, 1);
      },
      onDown: () => {
        if (!animating.current) gotoSection(currentIndex.current - 1, -1);
      },
      onPress: (self) => {
        if (self.event instanceof MouseEvent && self.event.button === 1) {
          self.event.preventDefault();
        }
      },
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
      <Langs />

      {/* 0: Hero */}
      <div ref={el => { sectionsRef.current[0] = el; }} className="absolute inset-0" id="hero">
        <Hero active={activeIndex === 0} />
      </div>

      {/* About Section */}
      <div ref={el => { sectionsRef.current[1] = el; }} className="absolute inset-0 overflow-hidden" id="about">
        <div className="w-full h-full lg:block hidden">
          <DesktopAbout active={activeIndex === 1} />
        </div>
        <div className="w-full h-full lg:hidden block">
          <MobileAbout active={activeIndex === 1} />
        </div>
      </div>

      {/* 2: Works */}
      <div ref={el => { sectionsRef.current[2] = el; }} className="absolute inset-0 overflow-hidden" id="works">
        <div className="w-full h-full lg:block hidden">
          <DesktopWorks active={activeIndex === 2} />
        </div>
        <div className="w-full h-full lg:hidden block">
          <MobileWorks active={activeIndex === 2} />
        </div>
      </div>

      {/* 3: Gallery */}
      <div ref={el => { sectionsRef.current[3] = el; }} className="absolute inset-0 overflow-hidden" id="gallery">
        <div className="w-full h-full lg:block hidden">
          <GallerySlide images={images} active={activeIndex === 3} />
        </div>
        <div className="w-full h-full lg:hidden block">
          <MobileGallerySlide images={images} active={activeIndex === 3} />
        </div>
      </div>

      {/* 4: Contact */}
      <div ref={el => { sectionsRef.current[4] = el; }} className="absolute inset-0" id="contact">
        <Contact active={activeIndex === 4} />
      </div>
    </div>
  );
};

export default Home;
