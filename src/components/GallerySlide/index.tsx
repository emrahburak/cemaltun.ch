import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

// Tüm görselleri import ediyoruz
import g1 from "@/assets/images/gallery/webp/cem-altun-gallery-01.webp";
import g2 from "@/assets/images/gallery/webp/cem-altun-gallery-02.webp";
import g3 from "@/assets/images/gallery/webp/cem-altun-gallery-03.webp";
import g4 from "@/assets/images/gallery/webp/cem-altun-gallery-04.webp";
import g5 from "@/assets/images/gallery/webp/cem-altun-gallery-05.webp";

gsap.registerPlugin(ScrollTrigger);

const GallerySlide = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Grid görsellerini seçiyoruz
    const gridImages = gsap.utils.toArray<HTMLElement>(".grid-image");

    // Başlangıç durumları (Grid görselleri gizli ve sağda)
    gsap.set(gridImages, { x: 150, opacity: 0 });

    // --- AŞAMA 1 & 2: Scroll Timeline ---
    // Tek bir timeline içinde tüm senaryoyu kurguluyoruz.
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=3000", // Scroll mesafesi (daha uzun/kısa ayarlanabilir)
        pin: true,
        pinSpacing: true,
        scrub: 1, // Yumuşak geçiş (1 saniye gecikmeli takip)
      },
    });

    // ADIM 1: Ana Görseli (g5) Blurla ve Geriye İt
    tl.to(mainImageRef.current, {
      filter: "blur(20px)", // Güçlü bir blur
      scale: 0.9, // Hafifçe küçülterek geriye itme hissi
      opacity: 0.5, // Biraz karartma
      duration: 1, // Timeline'daki göreceli süre
      ease: "power2.inOut",
    }, 0); // Timeline'ın en başında (0. saniye) başla

    // ADIM 2: Grid Görsellerini Sahneye Al
    // "soldan giriş" dediğin için, kendi içlerinde soldan sağa bir akışla
    // ama grid'in bulunduğu sağ alana doğru girmelerini sağlıyoruz.
    tl.to(gridImages, {
      x: 0, // Yerlerine gelsinler
      opacity: 1, // Görünür olsunlar
      stagger: {
        each: 0.15, // Her görsel arasında 0.15s gecikme
        from: "start", // İlk görselden başla (soldan sağa akış için)
      },
      duration: 1, // Her bir görselin giriş süresi
      ease: "power2.out",
    }, 0.2); // Ana görsel blurlanmaya başladıktan kısa bir süre sonra başla (0.2s)

  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-black overflow-hidden flex"
    >
      {/* --- SOL TARAF: Ana Görsel (g5) --- */}
      <div className="w-1/2 h-full flex items-center justify-center p-10 relative z-10">
        <div
          ref={mainImageRef}
          // Başlangıç stili: Beyaz çerçeve, hafif rotasyon
          className="relative w-[70%] aspect-[3/4] border-[8px] border-white shadow-2xl rotate-[-3deg] will-change-[transform,filter,opacity]"
        >
          <img
            src={g5}
            alt="Cem Altun Main Gallery"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* --- SAĞ TARAF: Grid Görselleri (g1, g2, g3, g4) --- */}
      <div className="w-1/2 h-full flex items-center justify-center p-10 relative z-10">
        {/* Grid Konteyneri: 2 sütunlu, boşluklu düzen */}
        <div ref={gridRef} className="grid grid-cols-2 gap-8 w-[80%]">
          {/* Görseller: Her biri .grid-image class'ına sahip */}
          {[g1, g2, g3, g4].map((img, index) => (
            <div
              key={index}
              // Stilizasyon: Daha ince çerçeve, farklı rotasyonlar
              className={`grid-image relative aspect-[4/5] border-[4px] border-white shadow-lg ${index % 2 === 0 ? 'rotate-[2deg]' : 'rotate-[-2deg]'} will-change-[transform,opacity]`}
            >
              <img
                src={img}
                alt={`Cem Altun Gallery ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySlide;
