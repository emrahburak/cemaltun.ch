import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../context/ThemeContext';
import gsap from 'gsap';

gsap.registerPlugin(ScrollTrigger);

// isDarkSection: true ise Navbar BEYAZ olur, false ise SİYAH olur.
export const usePageTheme = (isDarkSection: boolean) => {
  const containerRef = useRef<HTMLElement>(null);
  const { setIsDarkBackground } = useTheme();

  useGSAP(() => {
    if (!containerRef.current) return;

    ScrollTrigger.create({
      trigger: containerRef.current,
      // start: "top center": Bileşenin tepesi, ekranın ortasına geldiğinde
      // end: "bottom center": Bileşenin altı, ekranın ortasını geçtiğinde
      start: "top center",
      end: "bottom center",

      // Aşağı inerken bileşen ekrana girdi: Rengi ayarla
      onEnter: () => setIsDarkBackground(isDarkSection),

      // Yukarı çıkarken bileşen tekrar ekrana girdi: Rengi ayarla
      onEnterBack: () => setIsDarkBackground(isDarkSection),
    });
  }, { scope: containerRef });

  return containerRef;
};
