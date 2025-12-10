import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

const LensBlurOverlay = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!shineRef.current || !containerRef.current) return;
      const { width, height, left, top } = containerRef.current.getBoundingClientRect();
      const x = e.clientX - left;
      const y = e.clientY - top;

      const xMove = (x / width - 0.5) * 40;
      const yMove = (y / height - 0.5) * 40;

      gsap.to(shineRef.current, {
        x: -xMove,
        y: -yMove,
        duration: 0.6,
        ease: "power2.out"
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, { scope: containerRef });

  return (
    <div
      ref={containerRef}
      // Z-Index'i 'z-[9999]' yaparak garantiye alıyoruz
      className="absolute inset-0 w-full h-full rounded-full z-[9999] pointer-events-none overflow-hidden border border-white/20"
    >

      {/* --- ANA TEST KATMANI --- */}
      <div
        className="absolute inset-0"
        style={{
          // Tailwind yerine manuel CSS özellikleri
          backgroundColor: 'rgba(255, 255, 255, 0.1)', // Hafif beyazlık
          backdropFilter: 'blur(8px)',       // Standart
          WebkitBackdropFilter: 'blur(8px)', // Safari/Chrome desteği
        }}
      ></div>

      {/* VIGNETTE (Kenar Karartma) */}
      <div className="absolute inset-0 bg-radial-vignette opacity-50 mix-blend-multiply"></div>

      {/* SHINE (Parlama) */}
      <div
        ref={shineRef}
        className="absolute -top-[50%] -left-[50%] w-[200%] h-[200%] bg-gradient-to-br from-white/30 via-transparent to-transparent opacity-40 mix-blend-soft-light"
      ></div>

      {/* NOISE (Kumlanma) */}
      <div className="absolute inset-0 bg-noise opacity-30 mix-blend-overlay"></div>

    </div>
  );
};

export default LensBlurOverlay;
