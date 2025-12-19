
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";



import g1 from "@/assets/images/gallery/webp/cem-altun-gallery-01.webp";
import g2 from "@/assets/images/gallery/webp/cem-altun-gallery-02.webp";
import g3 from "@/assets/images/gallery/webp/cem-altun-gallery-03.webp";
import g4 from "@/assets/images/gallery/webp/cem-altun-gallery-04.webp";
import g5 from "@/assets/images/gallery/webp/cem-altun-gallery-05.webp";





gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  const images = [
    { id: 1, src: g1, alt: "Cinematic Shot 1" },
    { id: 2, src: g2, alt: "Cinematic Shot 1" },
    { id: 3, src: g3, alt: "Cinematic Shot 1" },
    { id: 4, src: g4, alt: "Cinematic Shot 1" },
    { id: 5, src: g5, alt: "Cinematic Shot 1" },
  ];

  useEffect(() => {
    const pin = gsap.fromTo(
      sectionRef.current,
      { translateX: 0 },
      {
        translateX: "-100vw", // Fotoğraf sayısına göre bu değer ayarlanabilir
        ease: "none",
        duration: 1,
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top top",
          end: "2000 top", // Kaydırma uzunluğu
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
        },
      }
    );
    return () => {
      pin.kill();
    };
  }, []);

  return (
    <div ref={triggerRef} className="overflow-hidden bg-[#111]">
      <div
        ref={sectionRef}
        className="h-screen flex flex-row items-center relative"
        style={{ width: "200vw" }} // İçerik genişliği
      >
        {/* Giriş Yazısı */}
        <div className="w-[100vw] flex flex-col justify-center px-20 shrink-0">
          <h2 className="text-[10px] font-manrope font-bold tracking-[0.5em] uppercase opacity-40 text-white mb-4">
            Visual Journey
          </h2>
          <h3 className="text-6xl md:text-8xl font-isidora font-light text-white leading-none">
            Moments <br />
            <span className="italic text-white/50">Captured</span>
          </h3>
        </div>

        {/* Fotoğraflar - Dikey halleriyle, kesilmeden */}
        <div className="flex flex-row gap-20 px-20 items-center">
          {images.map((img) => (
            <div key={img.id} className="relative h-[75vh] w-auto shrink-0 group">
              <img
                src={img.src}
                className="h-full w-auto object-contain grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
              />
              <p className="absolute -bottom-10 left-0 text-[10px] font-manrope font-bold tracking-[0.2em] uppercase text-white opacity-0 group-hover:opacity-40 transition-opacity">
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
