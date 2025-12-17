// import { useTranslation } from "react-i18next";
//
//

import g1 from "@/assets/images/gallery/webp/cem-altun-gallery-01.webp";
import g2 from "@/assets/images/gallery/webp/cem-altun-gallery-02.webp";
import g3 from "@/assets/images/gallery/webp/cem-altun-gallery-03.webp";
import g4 from "@/assets/images/gallery/webp/cem-altun-gallery-04.webp";
import g5 from "@/assets/images/gallery/webp/cem-altun-gallery-05.webp";




const Gallery = () => {
  // const { t } = useTranslation();

  // Şimdilik placeholder görseller, Cem Abi'den gelince değiştiririz.
  const images = [
    { id: 1, src: g1, alt: "Cinematic Shot 1" },
    { id: 2, src: g2, alt: "Cinematic Shot 1" },
    { id: 3, src: g3, alt: "Cinematic Shot 1" },
    { id: 4, src: g4, alt: "Cinematic Shot 1" },
    { id: 5, src: g5, alt: "Cinematic Shot 1" },
  ];

  return (
    <section
      id="gallery"
      className="w-full min-h-screen bg-[#111] flex flex-col justify-center px-6 py-20 md:px-20"
    >
      {/* Başlık Alanı */}
      <div className="mb-12 md:mb-20 flex flex-col items-center text-center">
        <h2 className="text-[10px] font-manrope font-bold tracking-[0.5em] uppercase opacity-60 text-white mb-4">
          Visuals
        </h2>
        <h3 className="text-4xl md:text-6xl font-isidora font-light text-white tracking-tight">
          Moments in <span className="italic opacity-70">Time</span>
        </h3>
      </div>

      {/* Görseller Grid'i - 3 Sütun */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 h-auto md:h-[60vh]">
        {images.map((img) => (
          <div
            key={img.id}
            className="relative w-full h-[50vh] md:h-full overflow-hidden rounded-sm group grayscale hover:grayscale-0 transition-all duration-700 ease-out"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000"
            />
            {/* Hafif overlay */}
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
