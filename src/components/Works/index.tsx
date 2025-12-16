
import { usePageTheme } from "../../hooks/usePageTheme";

const Works = () => {
  const containerRef = usePageTheme(false);
  return (
    <section ref={containerRef as any} id="works" className="w-full h-screen flex items-center justify-center bg-[#EAEAEA] text-[#222]">
      <h2 className="text-6xl font-isidora font-bold">WORKS</h2>
    </section>
  );
};

export default Works;
