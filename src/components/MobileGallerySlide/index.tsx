import { useRef, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

// Swiper Styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import type { galleryItem } from "../../data/gallery";
import "./MobileGallerySlide.css"

interface GalleryProps {
  data: galleryItem[];
  active?: boolean;
}

export default function GallerySlider({ data, active }: GalleryProps) {
  const { t } = useTranslation();
  const quoteText = t("gallery.quote");

  const [index, setIndex] = useState(-1);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  // Butonları Swiper'a bağlamak için state (Ref yerine bunlar daha sağlıklı çalışır)
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);
  const quoteTlRef = useRef<gsap.core.Timeline | null>(null);

  // --- NÜKLEER ÇÖZÜM: CAPTURING PHASE BLOCKER ---
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const stopGlobalScroll = (e: any) => e.stopImmediatePropagation();
    el.addEventListener('wheel', stopGlobalScroll, true);
    el.addEventListener('pointerdown', stopGlobalScroll, true);
    el.addEventListener('touchstart', stopGlobalScroll, true);
    return () => {
      el.removeEventListener('wheel', stopGlobalScroll, true);
      el.removeEventListener('pointerdown', stopGlobalScroll, true);
      el.removeEventListener('touchstart', stopGlobalScroll, true);
    };
  }, []);

  // --- QUOTE ANİMASYONU ---
  useGSAP(() => {
    if (quoteRef.current) {
      const tl = gsap.timeline({ paused: true });
      tl.fromTo(quoteRef.current,
        { opacity: 0, y: 20, filter: "blur(10px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 1.2, ease: "expo.out" }
      );
      quoteTlRef.current = tl;
    }
  }, { scope: mainRef, dependencies: [quoteText] });

  // --- ACTIVE DURUMU ---
  useEffect(() => {
    if (active) {
      quoteTlRef.current?.play();
      swiperInstance?.autoplay?.start();
    } else {
      quoteTlRef.current?.reverse();
      swiperInstance?.autoplay?.stop();
    }
  }, [active, swiperInstance]);

  return (
    <div
      ref={mainRef}
      data-scroll-ignore="true"
      className="osmo-gallery-section w-full h-full bg-black relative flex items-center overflow-hidden touch-none pointer-events-auto"
    >
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={data.map((item) => ({ src: item.img, alt: item.title }))}
      />

      <div className="w-full relative z-10 flex flex-col gap-8 md:gap-12">

        {/* QUOTE BÖLÜMÜ */}
        {/* <div className="px-12 md:px-24 max-w-[35em]"> */}
        {/*   <div ref={quoteRef} className="font-sollarish text-[0.8em] md:text-[0.6em] uppercase italic text-white/80 tracking-[0.2em]"> */}
        {/*     {quoteText} */}
        {/*   </div> */}
        {/* </div> */}

        {/* SWIPER SLIDER */}
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Pagination, Navigation, Autoplay]}
          navigation={{
            prevEl,
            nextEl,
          }}
          nested={true}
          touchMoveStopPropagation={true}
          grabCursor={true}
          slidesPerView={1.2}
          spaceBetween={30}
          centeredSlides={true}
          loop={true}
          speed={800}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          breakpoints={{
            768: { slidesPerView: 2.5 },
            1024: { slidesPerView: 3.5 }
          }}
          className="mySwiper !overflow-visible w-full"
        >
          {data.map((item, i) => (
            <SwiperSlide key={item.id} className="py-10">
              {({ isActive }) => (
                <div
                  onClick={() => setIndex(i)}
                  className={`relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer transition-all duration-1000
                    ${isActive ? 'opacity-100 scale-110 z-20 shadow-2xl shadow-white/10' : 'opacity-15 scale-90 blur-[1px]'}`}
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover select-none pointer-events-none" />
                  <div className={`absolute top-4 left-4 bg-white text-black px-3 py-1 flex items-center gap-2 transition-all duration-700
                    ${isActive && active ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                    <span className="text-[10px] font-bold tracking-tighter uppercase">Nº00{i + 1}</span>
                  </div>
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* --- CUSTOM NAVIGATION BUTTONS (SWIPER ALTINDA) --- */}
        <div className="mg-reveal flex flex-row gap-12 mt-4 items-center justify-center relative z-50">
          <button
            ref={setPrevEl}
            className="osmo-button group relative p-4 flex items-center justify-center cursor-pointer bg-transparent border-none outline-none"
            aria-label="Previous slide"
          >
            <div className="button-overlay pointer-events-none">
              <div className="overlay-corner top-left !border-white/40"></div>
              <div className="overlay-corner top-right !border-white/40"></div>
              <div className="overlay-corner bottom-left !border-white/40"></div>
              <div className="overlay-corner bottom-right !border-white/40"></div>
            </div>
            <svg viewBox="0 0 17 12" className="w-6 h-6 fill-white pointer-events-none transition-transform group-hover:scale-110">
              <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
            </svg>
          </button>

          <button
            ref={setNextEl}
            className="osmo-button group relative p-4 flex items-center justify-center cursor-pointer bg-transparent border-none outline-none"
            aria-label="Next slide"
          >
            <div className="button-overlay pointer-events-none">
              <div className="overlay-corner top-left !border-white/40"></div>
              <div className="overlay-corner top-right !border-white/40"></div>
              <div className="overlay-corner bottom-left !border-white/40"></div>
              <div className="overlay-corner bottom-right !border-white/40"></div>
            </div>
            <svg viewBox="0 0 17 12" className="w-6 h-6 fill-white rotate-180 pointer-events-none transition-transform group-hover:scale-110">
              <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
            </svg>
          </button>
        </div>

      </div>

      {/* Arka Plan Dekorasyonu */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent opacity-90" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent opacity-90" />
      </div>
    </div>
  );
}
