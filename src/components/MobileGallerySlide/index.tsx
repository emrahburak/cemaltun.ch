import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "./MobileGallerySlide.css"

// Swiper Styles
import "swiper/css";

import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

import "./MobileGallerySlide.css";

// --- LIGHTBOX ---
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function MobileGallerySlide({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <section className="mobile-gallery-section">

      {/* COUNTER */}
      <div className="mobile-counter">
        <span className="current-num">{(activeIndex + 1).toString().padStart(2, '0')}</span>
        <div className="mobile-counter-divider"></div>
        <span className="total-num opacity-30">{images.length.toString().padStart(2, '0')}</span>
      </div>

      {/* SWIPER SLIDER */}
      <div className="mobile-slider-list-wrapper">
        <Swiper
          modules={[Navigation, EffectCoverflow]}
          onBeforeInit={(swiper) => {
            swiperRef.current = swiper;
          }}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          loop={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          grabCursor={true}
          speed={600}
          effect={"coverflow"}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          className="mySwiper"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} className="mobile-slide-swiper">
              <div
                className="mobile-slide-inner"
                onClick={() => setLightboxIndex(i)}
              >
                <img src={src} alt={`Slide ${i}`} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* BUTONLAR (Senin Tasarımın) */}
      <div className="mobile-nav-row">
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="mobile-button"
        >
          <div className="mobile-button-overlay">
            <div className="mobile-corner top-left"></div>
            <div className="mobile-corner top-right"></div>
            <div className="mobile-corner bottom-left"></div>
            <div className="mobile-corner bottom-right"></div>
          </div>
          <svg viewBox="0 0 17 12" className="mobile-arrow">
            <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
          </svg>
        </button>

        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="mobile-button"
        >
          <div className="mobile-button-overlay">
            <div className="mobile-corner top-left"></div>
            <div className="mobile-corner top-right"></div>
            <div className="mobile-corner bottom-left"></div>
            <div className="mobile-corner bottom-right"></div>
          </div>
          <svg viewBox="0 0 17 12" className="mobile-arrow next">
            <path d="M6.28871 12L7.53907 10.9111L3.48697 6.77778H16.5V5.22222H3.48697L7.53907 1.08889L6.28871 0L0.5 6L6.28871 12Z" />
          </svg>
        </button>
      </div>

      <Lightbox
        index={lightboxIndex}
        open={lightboxIndex >= 0}
        close={() => setLightboxIndex(-1)}
        slides={images.map((src) => ({ src }))}
      />
    </section>
  );
}
