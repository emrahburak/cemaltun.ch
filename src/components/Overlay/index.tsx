const Overlay = () => {
  return (
    <div className="w-full h-screen relative flex flex-col items-center justify-center backdrop-blur-md bg-black/10">

      {/* --- NOISE EFEKTİ --- */}
      <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* --- ORTA KISIM: İSİM VE UNVAN --- */}
      {/* Scroll yapınca yukarı kayıp gidecekler */}
      <div className="relative z-10 flex flex-col items-center text-white drop-shadow-lg px-4">

        <h1 className="text-5xl md:text-7xl font-urbanist font-semibold tracking-tight mb-4 text-center">
          CEM ALTUN
        </h1>

        <p className="text-xs md:text-sm font-manrope font-medium tracking-[0.4em] uppercase opacity-90 text-center">
          Composer . Zürich
        </p>

      </div>

      {/* --- ALT KISIM: SCROLL İPUCU --- */}
      <div className="absolute bottom-16 animate-bounce z-20">
        <span className="text-white text-lg tracking-[0.3em] font-manrope font-bold drop-shadow-md cursor-default">
          SCROLL
        </span>
      </div>

    </div>
  );
};

export default Overlay;
