import defaultImage from "@/assets/images/webp/cem-altun-piano-09.webp";

const Hero = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Bu resim asla hareket etmez */}
      <img
        src={defaultImage}
        alt="Cem Altun"
        className="w-full h-full object-cover object-center grayscale-[20%] contrast-110"
      />
      {/* Hafif karartma (Opsiyonel) */}
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};

export default Hero;
