import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom"; // Link ve location eklendi
import gsap from "gsap";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const location = useLocation(); // Mevcut sayfayı takip etmek için

  const sidebarRef = useRef(null);
  const overlayRef = useRef(null);
  const menuItemsRef = useRef<HTMLUListElement>(null);

  const availableLanguages = ['en', 'de', 'tr'];

  // Navigasyon Linkleri - Tek bir yerden yönetim
  const navLinks = [
    { id: 'home', path: '/#hero' },
    { id: 'about', path: '/#about' },
    { id: 'works', path: '/#works' },
    { id: 'gallery', path: '/#gallery' },
    { id: 'contact', path: '/#contact' },
  ];

  // GSAP Animasyon Bloğu (Dokunulmadı)
  useEffect(() => {
    if (isOpen) {
      gsap.to(overlayRef.current, { opacity: 1, duration: 0.5, pointerEvents: "auto" });
      gsap.to(sidebarRef.current, { x: 0, duration: 0.8, ease: "power4.out" });

      if (menuItemsRef.current) {
        gsap.fromTo(
          menuItemsRef.current.querySelectorAll("li"),
          { x: 50, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5, stagger: 0.1, delay: 0.3, ease: "power3.out" }
        );
      }
      document.body.style.overflow = "hidden";
    } else {
      gsap.to(sidebarRef.current, { x: "100%", duration: 0.6, ease: "power4.in" });
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.5, pointerEvents: "none" });
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* 1. TRIGGER BUTTON */}
      <button
        onClick={toggleMenu}
        className="fixed top-10 right-10 z-[100] font-manrope font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 mix-blend-difference text-white"
      >
        {isOpen ? `[ ${t('common.close') || 'CLOSE'} ]` : `[ ${t('common.menu') || 'MENU'} ]`}
      </button>

      {/* 2. OVERLAY */}
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
            {navLinks.map((link) => (
              <li key={link.id} className="overflow-hidden">
                <Link
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`text-4xl md:text-5xl font-isidora font-light hover:italic transition-all duration-300 block origin-left capitalize
                    ${location.hash === `#${link.id}` ? "italic opacity-100" : "opacity-70 hover:opacity-100"}`}
                >
                  {t(`navbar.${link.id}`)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Alt Kısım: Dil Seçici ve Footer */}
        <div className="border-t border-white/20 pt-10">
          <div className="flex gap-4 mb-6 text-lg font-manrope tracking-widest uppercase">
            {availableLanguages.map((lng) => (
              <button
                key={lng}
                onClick={() => i18n.changeLanguage(lng)}
                className={`transition-opacity duration-300 ${i18n.language === lng ? "opacity-100 font-bold" : "opacity-40 hover:opacity-100"}`}
              >
                {lng}
              </button>
            ))}
          </div>
          <p className="text-[10px] opacity-40 tracking-[0.3em] uppercase">
            © {new Date().getFullYear()} Cem Altun
          </p>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
