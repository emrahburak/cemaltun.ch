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
import DesktopVideos from "../components/DesktopVideos";
import MobileVideos from "../components/MobileVideos";
import DesktopConcert from "../components/DesktopConcert";
import MobileConcert from "../components/MobileConcert";
import Contact from "../components/Contact";
import GallerySlide from "../components/GallerySlide";
import MobileGallerySlide from "../components/MobileGallerySlide";

// Resimlerin
import { galleryData } from "../data/gallery";
import MobileAbout from "../components/MobileAbout";
import DesktopAbout from "../components/DesktopAbout";
import Langs from "../components/Langs";

gsap.registerPlugin(Observer);

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();

  // --- STATE & REFS ---
  const [activeIndex, setActiveIndex] = useState(0); // React'in arayüzü güncellemesi için
  const currentIndex = useRef(0); // GSAP'in takibi için (Ref her zaman güncel kalır)
  const animating = useRef(false);
  const sectionsRef = useRef<(HTMLDivElement | null)[]>([]);
  const sectionIds = ["hero", "about", "works", "videos", "concert", "gallery", "contact"];

  // --- ANA GEÇİŞ FONKSİYONU ---
  const gotoSection = (index: number, direction: number) => {
    if (animating.current || index < 0 || index >= sectionIds.length) return;

    animating.current = true;
    const currentSection = sectionsRef.current[currentIndex.current];
    const nextSection = sectionsRef.current[index];

    const tl = gsap.timeline({
      onComplete: () => {
        animating.current = false;
        currentIndex.current = index;
        setActiveIndex(index);
        // Temizlik: Aktif olmayan tüm bölümleri arkaya at ve gizle (Performans ve çakışma için)
        sectionsRef.current.forEach((section, i) => {
          if (section && i !== index) {
            gsap.set(section, { autoAlpha: 0, zIndex: 0 });
          }
        });
      }
    });

    if (direction > 0) {
      // İLERİ: YENİ BÖLÜM AŞAĞIDAN GELİR
      gsap.set(nextSection, { yPercent: 100, autoAlpha: 1, zIndex: 10 });
      tl.to(nextSection, {
        yPercent: 0,
        duration: 1.2,
        ease: "power4.inOut"
      });
    } else {
      // GERİ: MEVCUT BÖLÜM AŞAĞI İNER (ALTTAKİ GÖRÜNÜR)
      // Önce gelecek olan alt bölümü hazırla (Görünür yap ve tam ekrana yerleştir)
      gsap.set(nextSection, { yPercent: 0, autoAlpha: 1, zIndex: 5 });
      // Mevcut üst bölümü aşağı kaydır
      gsap.set(currentSection, { zIndex: 10 });
      tl.to(currentSection, {
        yPercent: 100,
        duration: 1.2,
        ease: "power4.inOut"
      });
    }
  };

  useGSAP(() => {
    // İlk kurulum: Tüm bölümleri hazırla
    sectionsRef.current.forEach((section, i) => {
      if (!section) return;
      gsap.set(section, {
        position: "fixed",
        inset: 0,
        yPercent: i === 0 ? 0 : 100,
        autoAlpha: i === 0 ? 1 : 0,
        zIndex: i === 0 ? 10 : 0
      });
    });

    const observer = Observer.create({
      target: window,
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      tolerance: 15,
      dragMinimum: 50,
      onUp: () => !animating.current && gotoSection(currentIndex.current + 1, 1),
      onDown: () => !animating.current && gotoSection(currentIndex.current - 1, -1),
      preventDefault: false // Tarayıcı scroll eventlerini tamamen öldürmüyoruz
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
      <div ref={el => { sectionsRef.current[0] = el; }} className={`absolute inset-0 ${activeIndex === 0 ? "pointer-events-auto" : "pointer-events-none"}`} id="hero">
        <Hero active={activeIndex === 0} />
      </div>

      {/* About Section */}
      <div ref={el => { sectionsRef.current[1] = el; }} className={`absolute inset-0 overflow-hidden ${activeIndex === 1 ? "pointer-events-auto" : "pointer-events-none"}`} id="about">
        <div className="w-full h-full lg:block hidden">
          <DesktopAbout active={activeIndex === 1} />
        </div>
        <div className="w-full h-full lg:hidden block">
          <MobileAbout active={activeIndex === 1} />
        </div>
      </div>

      {/* 2: Works */}
      <div ref={el => { sectionsRef.current[2] = el; }} className={`absolute inset-0 overflow-hidden ${activeIndex === 2 ? "pointer-events-auto" : "pointer-events-none"}`} id="works">
        <div className="w-full h-full lg:block hidden">
          <DesktopWorks active={activeIndex === 2} />
        </div>
        <div className="w-full h-full lg:hidden block">
          <MobileWorks active={activeIndex === 2} />
        </div>
      </div>

      {/* 3: Videos */}
      <div ref={el => { sectionsRef.current[3] = el; }} className={`absolute inset-0 overflow-hidden ${activeIndex === 3 ? "pointer-events-auto" : "pointer-events-none"}`} id="videos">
        <div className="w-full h-full lg:block hidden">
          <DesktopVideos active={activeIndex === 3} />
        </div>
        <div className="w-full h-full lg:hidden block">
          <MobileVideos active={activeIndex === 3} />
        </div>
      </div>

      {/* 4: Concert */}
      <div ref={el => { sectionsRef.current[4] = el; }} className={`absolute inset-0 overflow-hidden ${activeIndex === 4 ? "pointer-events-auto" : "pointer-events-none"}`} id="concert">
        <div className="w-full h-full lg:block hidden">
          <DesktopConcert active={activeIndex === 4} />
        </div>
        <div className="w-full h-full lg:hidden block">
          <MobileConcert active={activeIndex === 4} />
        </div>
      </div>

      {/* 5: Gallery */}
      <div ref={el => { sectionsRef.current[5] = el; }} className={`absolute inset-0 overflow-hidden ${activeIndex === 5 ? "pointer-events-auto" : "pointer-events-none"}`} id="gallery">

        <div className="w-full h-full lg:block hidden">
          <GallerySlide data={galleryData} active={activeIndex === 5} />
        </div>
        <div className="w-full h-full lg:hidden block">
          <MobileGallerySlide data={galleryData} active={activeIndex === 5} />
        </div>
      </div>

      {/* 6: Contact */}
      <div ref={el => { sectionsRef.current[6] = el; }} className={`absolute inset-0 ${activeIndex === 6 ? "pointer-events-auto" : "pointer-events-none"}`} id="contact">
        <Contact active={activeIndex === 6} />
      </div>
    </div>
  );
};

export default Home;
