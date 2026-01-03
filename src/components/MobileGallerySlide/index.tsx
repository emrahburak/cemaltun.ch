import { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';

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

export default function MobileGallerySlide({ data, active }: GalleryProps) {
  const [index, setIndex] = useState(-1);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  const mainRef = useRef<HTMLDivElement>(null);

  // --- ARTIK ETKİLEŞİMİ TAMAMEN TARAYICIYA BIRAKIYORUZ ---
  // Karmaşık useEffect'leri ve stopPropagation'ları sildik.
  // Bu sayede tarayıcı dikey kaydırmayı (scroll) engellemez.

  useEffect(() => {
    if (active) {
      swiperInstance?.autoplay?.start();
    } else {
      swiperInstance?.autoplay?.stop();
    }
  }, [active, swiperInstance]);

  return (
    <div
      ref={mainRef}
      // touch-pan-y: Dikey kaydırmaya (scroll) izin ver, gerisini tarayıcı halletsin.
      className="osmo-gallery-section w-full h-full bg-black relative flex items-center overflow-hidden touch-pan-y pointer-events-auto"
    >
      <Lightbox
        index={index}
        open={index >= 0}
        close={() => setIndex(-1)}
        slides={data.map((item) => ({ src: item.img, alt: item.title }))}
      />

      <div className="w-full relative z-10 flex flex-col gap-8 md:gap-12">

        <Swiper
          onSwiper={setSwiperInstance}
          modules={[Pagination, Navigation, Autoplay]}
          navigation={{
            prevEl,
            nextEl,
          }}
          // --- KRİTİK AYARLAR ---
          allowTouchMove={false} // MOBİLDE PARMAKLA KAYDIRMAYI (GRAB) KAPATTIK
          nested={true}
          // ---------------------
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

        {/* --- CUSTOM NAVIGATION BUTTONS --- */}
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

      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-black to-transparent opacity-90" />
        <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-black to-transparent opacity-90" />
      </div>
    </div>
  );
}
