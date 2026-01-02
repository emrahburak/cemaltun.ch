import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";
import RevisedText from "../RevisedText";

interface ContactProps {
  active?: boolean;
}

const Contact = ({ active }: ContactProps) => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  const email = "info@cemaltun.ch";
  const locationText = t('contact.location');

  const links = [
    { name: "Instagram", url: "https://www.instagram.com/cem_altun/" },
    { name: "Facebook", url: "https://www.facebook.com/sanalozan/" },
    { name: "Spotify", url: "https://open.spotify.com/artist/0" },
    { name: "cemaltun.com.tr", url: "https://cemaltun.com.tr/" }
  ];

  // --- 1. ANİMASYON ORKESTRASYONU (BLOK BAZLI) ---
  useGSAP(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ paused: true });

    // Seçici: .contact-reveal sınıfına sahip blokları hedefler
    tl.fromTo(
      containerRef.current.querySelectorAll(".contact-reveal"),
      {
        opacity: 0,
        y: 30,
        filter: "blur(15px)"
      },
      {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: 0.15, // Bloklar arası asil geçiş
        ease: "power3.out",
        clearProps: "filter"
      }
    );

    // Footer (Alt Kısım) Animasyonu
    tl.fromTo(
      containerRef.current.querySelector(".contact-footer"),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" },
      "-=0.8" // Önceki bloklar bitmeden hafifçe başlasın
    );

    tlRef.current = tl;
  }, { scope: containerRef });

  // --- 2. TETİKLEME ---
  useEffect(() => {
    if (active) {
      tlRef.current?.play();
    } else {
      tlRef.current?.reverse();
    }
  }, [active]);

  return (
    <section
      ref={containerRef}
      id="contact"
      className="w-full h-full flex flex-col justify-between bg-[#f5f5f5] px-6 py-20 md:px-20 md:py-32 overflow-hidden"
    >
      {/* ÜST KISIM */}
      <div className="flex flex-col space-y-8 mt-10 md:mt-20">
        <h2 className="contact-reveal block md:hidden text-[10px] font-manrope font-bold tracking-[0.5em] uppercase opacity-40 text-black">
          {t('navbar.contact') || 'CONTACT'}
        </h2>

        {/* Email Bloğu */}
        <div className="contact-reveal">
          <a
            href={`mailto:${email}`}
            className="block text-3xl sm:text-6xl md:text-[7.5vw] font-urbanist font-light tracking-tighter text-black hover:italic hover:opacity-70 transition-all duration-700 ease-out leading-none"
          >
            {email}
          </a>
        </div>

        {/* Lokasyon Bloğu */}
        <p className="contact-reveal font-manrope opacity-50 pl-1 mt-4 text-black text-lg tracking-tight">
          {locationText}
        </p>
      </div>

      {/* ALT KISIM (Footer) */}
      <div
        className="contact-footer flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 border-t border-black/10 pt-10"
      >
        {/* Sosyal Linkler */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4">
          {links.map((link) => (
            <RevisedText
              key={link.name}
              as="a" // Normal anchor etiketi olarak kullanıyoruz
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              text={link.name}
              hoverUnderline={true}
              // pb-1 ekleyerek alt çizgiye nefes alma alanı bıraktık
              className="text-[0.6rem] font-manrope font-bold tracking-[0.25em] uppercase text-black opacity-40 hover:opacity-100 pb-1"
            />
          ))}
        </div>

        {/* Copyright ve Privacy */}
        {/* items-center (Mobil için orta) ve lg:items-end (Masaüstü için sağ) eklendi */}
        <div className="flex flex-col gap-2 items-center lg:items-end text-center lg:text-right">

          <RevisedText
            as={Link}
            to="/privacy"
            text={t('privacy.title')}
            hoverUnderline={true}
            // w-fit içeride olduğu için burada kutuyu sağa itmemiz yeterli
            className="text-[0.55rem] font-manrope font-bold tracking-[0.2em] uppercase text-black opacity-20 hover:opacity-60 pb-1"
          />

          <div className="text-[0.6rem] font-manrope opacity-30 tracking-[0.2em] uppercase text-black leading-relaxed">
            © {new Date().getFullYear()} Cem Altun. <br />
            {t('contact.copyright')}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
