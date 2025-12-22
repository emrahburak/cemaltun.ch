import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTheme } from "../hooks/usePageTheme";

import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import About from "../components/About";
import Works from "../components/Works";
import Contact from "../components/Contact";
import GallerySlide from "../components/GallerySlide";

import g1 from "@/assets/images/gallery/webp/cem-altun-gallery-01.webp";
import g2 from "@/assets/images/gallery/webp/cem-altun-gallery-02.webp";
import g3 from "@/assets/images/gallery/webp/cem-altun-gallery-03.webp";
import g4 from "@/assets/images/gallery/webp/cem-altun-gallery-04.webp";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const mainRef = useRef<HTMLDivElement>(null);
  const images = [g1, g2, g3, g4];
  const themeRef = usePageTheme(true);

  useGSAP(() => {
    // SNAP MEKANİZMASINI KALDIRDIK 
    // Bu sayede "About" sayfası kendini yukarı ittirmeye çalışmayacak.
    // Kullanıcı Hero zoom'u bitirdiğinde doğal bir şekilde aşağı kaymaya devam edecek.
  }, { scope: mainRef });

  return (
    <div ref={mainRef} className="relative w-full bg-white">
      <Sidebar />

      <div ref={themeRef as any} className="absolute top-0 left-0 w-full h-screen pointer-events-none -z-10" />

      {/* Hero kendi içindeki zoom ve pinleme mekanizmasını yönetir */}
      <section id="hero">
        <Hero />
      </section>

      {/* Diğer bölümler normal akışta (snap baskısı olmadan) */}
      <section id="about" className="w-full min-h-screen">
        <About />
      </section>

      <section id="works" className="w-full min-h-screen">
        <Works />
      </section>

      <section id="gallery" className="w-full min-h-screen">
        <GallerySlide images={images} />
      </section>

      <section id="contact" className="w-full min-h-screen">
        <Contact />
      </section>
    </div>
  );
};

export default Home;
