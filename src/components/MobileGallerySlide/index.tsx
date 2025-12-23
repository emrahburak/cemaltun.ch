import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useTranslation } from 'react-i18next';

// Styles
import 'swiper/css';
import 'swiper/css/navigation';
import './MobileGallerySlide.css';

export default function MobileGallerySlide({ images }: { images: string[] }) {
  const [prevEl, setPrevEl] = useState<HTMLButtonElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLButtonElement | null>(null);
  const { t } = useTranslation();
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="mobile-gallery-wrapper bg-black w-full min-h-screen flex flex-col justify-center py-12">

      {/* --- 1. TITLE (SOL ÜSTTE) --- */}
      <div className="w-full px-8 mb-4">
        <h2 className="text-[10px] font-manrope font-bold tracking-[0.5em] uppercase opacity-40 text-white text-left">
          {t('navbar.gallery')}
        </h2>
      </div>

      {/* --- 2. COUNTER (ORTADA) --- */}
      <div className="w-full flex justify-center items-center gap-3 mb-6  text-[1.2rem] tracking-[0.3em] uppercase font-sollarish">
        <span className="text-white font-medium">
          {activeIndex + 1 < 10 ? `0${activeIndex + 1}` : activeIndex + 1}
        </span>
        <span className="w-8 h-[1px] bg-white/20"></span>
        <span className="text-white/40">
          {images.length < 10 ? `0${images.length}` : images.length}
        </span>
      </div>

      {/* --- 3. IMAGE AREA (SWIPER) --- */}
      <div className="w-full px-6">
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          navigation={{ prevEl, nextEl }}
          modules={[Navigation]}
          className="mySwiper w-full h-[55vh] overflow-visible"
        >
          {images.map((src, index) => (
            <SwiperSlide key={index} className="relative overflow-hidden rounded-sm">
              <div className="absolute inset-y-0 left-0 w-16 z-10 pointer-events-none bg-gradient-to-r from-black/80 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-16 z-10 pointer-events-none bg-gradient-to-l from-black/80 to-transparent" />
              <img
                src={src}
                alt={`Slide ${index}`}
                className="w-full h-full object-cover select-none"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* --- 4. NAVIGASYON BUTONLARI (ORTADA) --- */}
      <div className="flex flex-row gap-12 mt-12 items-center justify-center relative z-50">
        <button ref={setPrevEl} className="osmo-button group relative p-4 flex items-center justify-center cursor-pointer">
          <div className="button-overlay pointer-events-none">
            <div className="overlay-corner top-left !border-white/40"></div>
            <div className="overlay-corner top-right !border-white/40"></div>
            <div className="overlay-corner bottom-left !border-white/40"></div>
            <div className="overlay-corner bottom-right !border-white/40"></div>
          </div>
          <svg viewBox="0 0 17 12" className="w-6 h-6 fill-white pointer-events-none">
            <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
          </svg>
        </button>

        <button ref={setNextEl} className="osmo-button group relative p-4 flex items-center justify-center cursor-pointer">
          <div className="button-overlay pointer-events-none">
            <div className="overlay-corner top-left !border-white/40"></div>
            <div className="overlay-corner top-right !border-white/40"></div>
            <div className="overlay-corner bottom-left !border-white/40"></div>
            <div className="overlay-corner bottom-right !border-white/40"></div>
          </div>
          <svg viewBox="0 0 17 12" className="w-6 h-6 fill-white rotate-180 pointer-events-none">
            <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
