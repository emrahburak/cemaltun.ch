import { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin"; // Yeni ekledik

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

// Plugin Kayıtları
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const { hash } = useLocation();
  const images = [g1, g2, g3, g4];

  // --- NAVİGASYON VE SCROLL YÖNETİMİ ---
  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");
      const element = document.getElementById(targetId);

      if (element) {
        // Sidebar'ın kapanması ve body overflow'un düzelmesi için 150ms bekleme
        const timeout = setTimeout(() => {
          gsap.to(window, {
            duration: 1.8,
            scrollTo: {
              y: element,
              autoKill: true, // Kullanıcı müdahale ederse animasyonu durdurur
            },
            ease: "power4.inOut", // Çok asil ve yavaş başlayan/biten bir geçiş
          });
        }, 150);

        return () => clearTimeout(timeout);
      }
    }
  }, [hash]);

  // --- GSAP KAPSAMI ---
  useGSAP(() => {
    // Burada ileride ekleyeceğimiz genel animasyonlar veya 
    // Hero sonrası geçiş optimizasyonları yer alacak.
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="relative w-full bg-white">
      {/* Sidebar her zaman üstte */}
      <Sidebar />

      {/* Hero: Kendi zoom ve pin mekanizmasını yönetir */}
      <section id="hero">
        <Hero />
      </section>

      {/* About Section */}
      <section id="about" className="w-full min-h-screen">
        <About />
      </section>

      {/* Works Section */}
      <section id="works" className="w-full min-h-screen">
        <Works />
      </section>

      {/* Gallery Section: Props'lar korundu */}
      <section id="gallery" className="w-full min-h-screen">
        <div className="hidden lg:block">
          <GallerySlide images={images} />
        </div>
        <div className="lg:hidden">
          <MobileGallerySlide images={images} />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="w-full min-h-screen">
        <Contact />
      </section>

      {/* Dekoratif Arka Plan Katmanı (Eğer gerekiyorsa) */}
      <div className="absolute top-0 left-0 w-full h-screen pointer-events-none -z-10" />
    </div>
  );
};

export default Home;
