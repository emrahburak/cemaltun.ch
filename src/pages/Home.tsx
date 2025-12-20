import { useState, useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePageTheme } from "../hooks/usePageTheme";

import Hero from "../components/Hero";
import Overlay from "../components/Overlay";
// NAVBAR yerine SIDEBAR import ediyoruz
import Sidebar from "../components/Sidebar";
import CinematicIntro from "../components/CinematicIntro";
import About from "../components/About";
import Works from "../components/Works";
import Contact from "../components/Contact";
import GallerySlide from "../components/GallerySlide";

gsap.registerPlugin(ScrollTrigger, useGSAP);


// Görseller
import g1 from "@/assets/images/gallery/webp/cem-altun-gallery-01.webp";
import g2 from "@/assets/images/gallery/webp/cem-altun-gallery-02.webp";
import g3 from "@/assets/images/gallery/webp/cem-altun-gallery-03.webp";
import g4 from "@/assets/images/gallery/webp/cem-altun-gallery-04.webp";
import g5 from "@/assets/images/gallery/webp/cem-altun-gallery-05.webp";

const IntroTrigger = () => {
  const ref = usePageTheme(true);
  return <div ref={ref as any} className="w-full h-[200vh] absolute top-0 left-0 -z-10 pointer-events-none" />;
};

const Home = () => {
  const sectionsContainerRef = useRef<HTMLDivElement>(null);
  const [isNavbarFixed, setIsNavbarFixed] = useState(false);
  const images = [g1, g2, g3, g4, g5];

  useGSAP(() => {
    ScrollTrigger.create({
      trigger: "body",
      start: "100vh top",
      onEnter: () => setIsNavbarFixed(true),
      onLeaveBack: () => setIsNavbarFixed(false),
    });

    if (sectionsContainerRef.current) {
      const allChildren = gsap.utils.toArray(sectionsContainerRef.current.children) as HTMLElement[];
      const sections = allChildren.filter(child => child.tagName === "SECTION");

      if (sections.length > 0) {
        ScrollTrigger.create({
          trigger: sectionsContainerRef.current,
          start: "top top",
          end: "bottom bottom",
          snap: {
            snapTo: sections,
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
      <Hero />
      <CinematicIntro trigger={isNavbarFixed} />

      <div className="relative z-10">
        <Overlay />
        <Sidebar />

        <div ref={sectionsContainerRef} className="relative">
          <IntroTrigger />
          <section id="intro-scene" className="w-full h-[200vh] bg-transparent pointer-events-none"></section>
          <About />
          <Works />
          <GallerySlide images={images} />
          <Contact />
        </div>
      </div>
    </div>
  );
};

export default Home;
