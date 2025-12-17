import { useTranslation } from "react-i18next";
import { usePageTheme } from "../../hooks/usePageTheme";

// Senin import ettiğin görsel
import defaultImage from "@/assets/images/about/webp/cem-altun-about-01.webp";

const About = () => {
  const { t } = useTranslation();
  const containerRef = usePageTheme(false);

  return (
    <section
      ref={containerRef as any}
      id="about"
      // items-center'ı kaldırdık, pt-24 (Navbar boyu) ekledik
      className="w-full h-screen flex justify-center bg-[#f5f5f5] text-[#222] px-10 md:px-20 pt-24 pb-12"
    >
      {/* items-stretch: Sol ve sağ sütunların boyunu eşitler.
         Fotoğrafın yazı ile aynı boyda olması için bu kritik.
      */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-stretch my-auto">

        {/* SOL TARAF: İçerik */}
        <div className="flex flex-col justify-center">
          <h2 className="text-xs font-manrope font-bold mb-6 tracking-[0.3em] uppercase opacity-50">
            {t("about.title")}
          </h2>

          <div className="space-y-6">
            <p className="font-manrope text-base md:text-lg leading-relaxed opacity-90 whitespace-pre-line max-w-prose">
              {t("about.content")}
            </p>
          </div>
        </div>

        {/* SAĞ TARAF: Görsel */}
        <div className="flex justify-center md:justify-end py-4">
          {/* h-full: Kapsayıcısının (grid sütunu) tüm boyunu kaplar.
             Böylece soldaki yazı ne kadar uzarsa fotoğraf da o kadar uzar.
          */}
          <div className="relative w-full max-w-[450px] h-full overflow-hidden shadow-2xl">
            <img
              src={defaultImage}
              alt="Cem Altun"
              // object-cover sayesinde fotoğraf bozulmadan alanı doldurur
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 border-[1px] border-black/5 pointer-events-none"></div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default About;
