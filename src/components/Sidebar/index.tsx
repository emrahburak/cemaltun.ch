import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import gsap from "gsap";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);

  // Diller
  const availableLanguages = ['en', 'de'];

  // GSAP Animasyonu: Menü açılıp kapanma mantığı
  useEffect(() => {
    if (isOpen) {
      // Menü Açılışı
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, pointerEvents: "auto" });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.8, ease: "power4.out" });

      // Linklerin tek tek (stagger) belirmesi
      if (menuItemsRef.current) {
        gsap.fromTo(
          menuItemsRef.current.querySelectorAll("li"),
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power3.out" }
        );
      }

      // Sayfa scroll'unu kilitle
      document.body.style.overflow = "hidden";
    } else {
      // Menü Kapanışı
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.6, ease: "power4.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.5, pointerEvents: "none" });

      // Sayfa scroll'unu aç
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 1. TRIGGER BUTTON: Her zaman sağ üstte */}
      <button
        onClick={toggleMenu}
        className="fixed top-10 right-10 z-[100] font-manrope font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 mix-blend-difference text-white"
      >
        {isOpen ? `[ ${t('common.close') || 'CLOSE'} ]` : `[ ${t('common.menu') || 'MENU'} ]`}
      </button>

      {/* 2. OVERLAY: Arka plan karartma */}
      <div
        ref={overlayRef}
        onClick={toggleMenu}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[80] opacity-0 pointer-events-none"
      />

      {/* 3. SIDEBAR PANEL */}
      <div
        ref={sidebarRef}
        className="fixed top-0 right-0 h-full z-[90] bg-[#1a1a1a] text-white shadow-2xl translate-x-full
                   w-full md:w-1/3 flex flex-col justify-between p-12 md:p-20"
      >
        {/* Menü Linkleri */}
        <nav className="mt-20">
          <ul ref={menuItemsRef} className="space-y-8">
            {['home', 'about', 'works', 'contact'].map((item) => (
              <li key={item} className="overflow-hidden">
                <a
                  href={`#${item}`}
                  onClick={() => setIsOpen(false)}
                  className="text-4xl md:text-5xl font-isidora font-light hover:italic transition-all duration-300 block origin-left"
                >
                  {t(`navbar.${item}`)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Alt Kısım: Dil Seçici ve Footer */}
        <div className="border-t border-white/10 pt-10">
          <div className="flex gap-4 mb-6 text-sm font-manrope tracking-widest uppercase">
            {availableLanguages.map((lng) => (
              <button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                className={`${i18n.language === lng ? "opacity-100 font-bold" : "opacity-40"}`}
              >
                {lng}
              </button>
            ))}
          </div>
          <p className="text-[10px] opacity-30 tracking-[0.3em] uppercase">
            © 2024 Cem Altun
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
