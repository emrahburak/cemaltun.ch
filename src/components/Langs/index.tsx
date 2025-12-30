import { useTranslation } from "react-i18next";

const Langs = () => {
  const { i18n } = useTranslation();
  const availableLanguages = ['en', 'de', 'tr'];

  return (
    <div
      className="fixed top-20 right-10 z-[100] flex flex-col items-end gap-2 mix-blend-difference"
    >
      <div className="flex gap-4 font-manrope font-bold text-[14px] tracking-[0.2em] uppercase text-white">
        {availableLanguages.map((lng) => (
          <button
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            className={`transition-all duration-300 ${i18n.language === lng
                ? "opacity-100 scale-110"
                : "opacity-40 hover:opacity-100 hover:scale-105"
              }`}
          >
            {lng}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Langs;
