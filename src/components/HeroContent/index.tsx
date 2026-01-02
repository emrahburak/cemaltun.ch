import { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import RevisedText from "../RevisedText";



const HeroContent = forwardRef<HTMLDivElement>((_, ref) => {
  const { t } = useTranslation();

  return (
    <div ref={ref} className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white pointer-events-none">
      <div className="space-y-6 md:space-y-8 px-4">

        {/* ÜST METİN: Stagger yok ama ileride ekleyebilirsin */}
        <RevisedText
          text={t('hero.official_website')}
          className="hero-subtext font-manrope text-lg md:text-xs tracking-[0.8em] uppercase font-semibold opacity-60"
        />

        {/* ANA BAŞLIK: Stagger ve Gölge burada devreye giriyor */}
        {/* ANA BAŞLIK: justify-center ve flex-wrap eklendi */}
        <RevisedText
          text="CEM ALTUN"
          as="h1"
          stagger
          charShadow
          className="font-urbanist text-5xl md:text-8xl lg:text-9xl font-bold tracking-tighter uppercase justify-center flex-wrap"
        />

        {/* ALT BİLGİ: İki ayrı RevisedText veya bütünsel kullanım */}
        <div className="hero-subtext flex items-center justify-center gap-4 md:gap-8 font-urbanist text-[10px] md:text-sm tracking-[0.5em] uppercase font-bold opacity-60">
          <RevisedText text={t('hero.composer')} />
          <span className="w-1 h-1 bg-white/20 rounded-full"></span>
          <RevisedText text={t('hero.zurich')} />
        </div>

      </div>
    </div>
  );
});

HeroContent.displayName = "HeroContent";
export default HeroContent;
