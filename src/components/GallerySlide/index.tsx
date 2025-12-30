import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, EffectCoverflow, Autoplay } from 'swiper/modules';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import 'swiper/css';
import 'swiper/css/effect-coverflow';

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import type { galleryItem } from "../../data/gallery";
import "./GallerySlider.css"

interface GalleryProps {
  data: galleryItem[];
  active?: boolean;
}

export default function GallerySlider({ data, active }: GalleryProps) {
  const [index, setIndex] = useState(-1);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);
  const revealTlRef = useRef<gsap.core.Timeline | null>(null);

  // --- 1. SADECE BUTONLAR İÇİN REVEAL ANİMASYONU ---
  useGSAP(() => {
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(".mg-reveal",
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
    revealTlRef.current = tl;
  }, { scope: mainRef });

  // --- 2. ACTIVE DURUMUNA GÖRE TETİKLEME ---
  useEffect(() => {
    if (active) {
      revealTlRef.current?.play();
      swiperInstance?.autoplay?.start();
    } else {
      revealTlRef.current?.reverse();
      swiperInstance?.autoplay?.stop();
    }
  }, [active, swiperInstance]);

  return (
    <div ref={mainRef} className="osmo-gallery-section w-full h-full bg-black relative flex items-center justify-center overflow-hidden">

      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={data.map((item) => ({ src: item.img, alt: item.title }))}
      />

      <div className="w-full relative z-10 flex flex-col gap-2 items-center">

        {/* SWIPER */}
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Navigation, EffectCoverflow, Autoplay]}
          effect={'coverflow'}
          navigation={{ prevEl, nextEl }}
          centeredSlides={true}
          slidesPerView={1.5}
          loop={true}
          speed={1000}
          allowTouchMove={false} // Grab kapalı
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          breakpoints={{
            1024: { slidesPerView: 3 }
          }}
          className="mySwiper !overflow-visible w-full"
        >
          {data.map((item, i) => (
            <SwiperSlide key={item.id} className="py-4">
              {({ isActive }) => (
                <div
                  onClick={() => isActive ? setIndex(i) : swiperInstance.slideToLoop(i)}
                  className={`relative aspect-[4/3] rounded-sm overflow-hidden cursor-pointer transition-all duration-1000
                    ${isActive ? 'opacity-100 scale-110 z-20 shadow-2xl shadow-white/5' : 'opacity-20 scale-90 blur-[2px]'}`}
                >
                  <img src={item.img} alt={item.title} className="w-full h-full object-cover select-none" />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* BUTONLAR */}
        <div className="mg-reveal flex flex-row gap-8 items-center justify-center relative z-50">
          <button ref={setPrevEl} className="osmo-button group relative p-4 flex items-center justify-center cursor-pointer">
            <div className="button-overlay pointer-events-none">
              <div className="overlay-corner top-left"></div><div className="overlay-corner top-right"></div>
              <div className="overlay-corner bottom-left"></div><div className="overlay-corner bottom-right"></div>
            </div>
            <svg viewBox="0 0 17 12" className="w-5 h-5 fill-white pointer-events-none transition-transform group-hover:scale-110">
              <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
            </svg>
          </button>

          <button ref={setNextEl} className="osmo-button group relative p-4 flex items-center justify-center cursor-pointer">
            <div className="button-overlay pointer-events-none">
              <div className="overlay-corner top-left"></div><div className="overlay-corner top-right"></div>
              <div className="overlay-corner bottom-left"></div><div className="overlay-corner bottom-right"></div>
            </div>
            <svg viewBox="0 0 17 12" className="w-5 h-5 fill-white rotate-180 pointer-events-none transition-transform group-hover:scale-110">
              <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
