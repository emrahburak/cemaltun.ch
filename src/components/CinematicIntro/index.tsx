import { useEffect, useState } from "react";

interface Props {
  trigger: boolean;
}

const CinematicIntro = ({ trigger }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (trigger) {
      // Navbar yerine oturduğunda 5 saniye (5000ms) bekle
      timer = setTimeout(() => {
        setIsVisible(true);
      }, 1500);
    } else {
      // Navbar yukarı çıkarsa yazıyı hemen gizle
      setIsVisible(false);
    }

    return () => clearTimeout(timer);
  }, [trigger]);

  return (
    // fixed inset-0: Yazıları ekranın ortasına çiviler, scroll ile hareket etmez.
    <section
      className={`fixed inset-0 flex flex-col items-center justify-center z-5 pointer-events-none transition-all duration-1000 ${isVisible ? "opacity-100 blur-0 scale-100" : "opacity-0 blur-xl scale-110"
        }`}
    >
      <div className="text-center text-white drop-shadow-2xl space-y-8 px-4">
        <p className="text-xs md:text-sm font-manrope tracking-[0.5em] uppercase opacity-80">
          Official Website
        </p>
        <h1 className="text-5xl md:text-8xl font-isidora font-bold tracking-tight">
          CEM ALTUN
        </h1>
        <div className="text-sm font-manrope tracking-[0.3em] uppercase opacity-70">
          Composer & Sound Designer <span className="mx-2">.</span> Zürich
        </div>
        {/* YENİ: SCROLL İPUCU */}
        <div className={`mt-20 transition-all duration-700 ease-out ${isVisible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <span className="text-sm tracking-[0.4em] font-manrope font-bold uppercase animate-pulse">
            SCROLL DOWN
          </span>
        </div>
      </div>
    </section>
  );
};

export default CinematicIntro;
