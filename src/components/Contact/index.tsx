import { useRef } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom"; // Sayfa geçişi için ekledik

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const emailRef = useRef<HTMLAnchorElement>(null);
  const locationRef = useRef<HTMLParagraphElement>(null);

  const email = "info@cemaltun.ch";
  const locationText = t('contact.location');

  const links = [
    { name: "Instagram", url: "https://www.instagram.com/cem_altun/" },
    { name: "Facebook", url: "https://www.facebook.com/sanalozan/" },
    { name: "Spotify", url: "https://open.spotify.com/artist/0" }, // Örnek URL
    { name: "cemaltun.com.tr", url: "https://cemaltun.com.tr/" }
  ];

  useGSAP(() => {
    // --- 1. EMAIL ANIMASYONU (Harf Harf) ---
    const emailChars = emailRef.current?.querySelectorAll(".char");
    if (emailChars) {
      gsap.fromTo(emailChars,
        { opacity: 0, y: 40, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.02,
          scrollTrigger: {
            trigger: emailRef.current,
            start: "top 90%",
            toggleActions: "play none none none"
          }
        }
      );
    }

    // --- 2. LOCATION ANIMASYONU ---
    const locationChars = locationRef.current?.querySelectorAll(".char");
    if (locationChars) {
      gsap.fromTo(locationChars,
        { opacity: 0, x: 10, filter: "blur(5px)" },
        {
          opacity: 0.5,
          x: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          stagger: 0.01,
          scrollTrigger: {
            trigger: locationRef.current,
            start: "top 95%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      id="contact"
      className="w-full h-screen flex flex-col justify-between bg-[#f5f5f5] px-6 py-20 md:px-20 md:py-32 overflow-hidden"
    >
      {/* ÜST KISIM */}
      <div className="flex flex-col space-y-8 mt-10 md:mt-20">
        <h2 className="block md:hidden text-[10px] font-manrope font-bold tracking-[0.5em] uppercase opacity-40 text-black">
          {t('navbar.contact') || 'CONTACT'}
        </h2>

        <a
          ref={emailRef}
          href={`mailto:${email}`}
          className="block text-3xl sm:text-6xl md:text-[7.5vw] font-urbanist font-light tracking-tighter text-black hover:italic hover:opacity-70 transition-all duration-700 ease-out leading-none break-all md:break-normal"
        >
          {email.split("").map((char, i) => (
            <span key={i} className="char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </a>

        <p ref={locationRef} className="font-manrope opacity-50 pl-1 mt-4 text-black text-lg tracking-tight">
          {locationText.split("").map((char, i) => (
            <span key={i} className="char inline-block whitespace-pre">
              {char}
            </span>
          ))}
        </p>
      </div>

      {/* ALT KISIM (Linkler ve Copyright) */}
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-10 border-t border-black/10 pt-10">

        {/* Sol Taraf: Sosyal Linkler */}
        <div className="flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.6rem] font-manrope font-bold tracking-[0.25em] uppercase text-black opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Sağ Taraf: Copyright ve Privacy */}
        <div className="flex flex-col gap-2 text-center lg:text-right">
          <Link
            to="/privacy"
            className="text-[0.55rem] font-manrope font-bold tracking-[0.2em] uppercase text-black opacity-20 hover:opacity-60 transition-opacity duration-300"
          >
            {t('privacy.title')}
          </Link>

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
