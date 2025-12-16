import { usePageTheme } from "../../hooks/usePageTheme";

const About = () => {
  // FALSE gönderiyoruz, çünkü About açık renkli, Navbar SİYAH (DarkBackground: false) olmalı.
  const containerRef = usePageTheme(false);

  return (
    // ref={containerRef}'i en dıştaki etikete ekliyoruz (TS için 'any' veya doğru tip dönüşümü gerekebilir)
    <section ref={containerRef as any} id="about" className="w-full h-screen flex bg-[#f5f5f5] text-[#222]">
      {/* ... İçeriklerin ... */}
      <div className="w-1/4 h-full pt-20 flex flex-col items-start px-12 border-r border-[#ddd]">
        <h2 className="text-xl font-manrope font-bold mb-8 tracking-[0.2em] uppercase">About</h2>
      </div>
      <div className="w-3/4 h-full pt-20 px-16">
        <h1 className="text-5xl font-isidora font-bold">About Section</h1>
      </div>
    </section>
  );
};

export default About;
