import { useTheme } from "../../context/ThemeContext";
import { useTranslation } from 'react-i18next';

const Navbar = () => {
  const { isDarkBackground } = useTheme();
  const { t, i18n } = useTranslation();

  // Renk Sınıfları
  const textColorClass = isDarkBackground ? "text-white" : "text-black";
  // Border rengi için sınıflar
  const borderColorClass = isDarkBackground ? "bg-white/20" : "bg-black/10";

  const availableLanguages = ['en', 'de'];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="sticky top-0 z-50 w-full h-24 flex justify-center items-center bg-transparent transition-all duration-300 px-10">

      {/* --- DINAMIK BORDER (Kenarlara değmeyen alt çizgi) --- */}
      <div
        className={`absolute bottom-0 left-10 right-10 h-[3px] transition-colors duration-500 ${borderColorClass}`}
      />

      <ul className={`flex gap-12 text-sm font-manrope font-medium tracking-[0.2em] uppercase opacity-90 transition-colors duration-500`}>

        <li className={`cursor-pointer hover:opacity-70 transition-opacity ${textColorClass}`}>
          {t('navbar.home')}
        </li>
        <li className={`cursor-pointer hover:opacity-70 transition-opacity ${textColorClass}`}>
          {t('navbar.about')}
        </li>
        <li className={`cursor-pointer hover:opacity-70 transition-opacity ${textColorClass}`}>
          {t('navbar.works')}
        </li>
        <li className={`cursor-pointer hover:opacity-70 transition-opacity ${textColorClass}`}>
          {t('navbar.contact')}
        </li>

        {/* Dil Seçici */}
        <li className={`ml-8 text-xs font-semibold cursor-pointer flex items-center ${textColorClass}`}>
          {availableLanguages.map((lng, index) => (
            <span
              key={lng}
              onClick={() => changeLanguage(lng)}
              className={`
                        ${i18n.language === lng ? 'opacity-100 font-bold' : 'opacity-50 hover:opacity-70'} 
                        transition-opacity duration-200
                    `}
            >
              {lng.toUpperCase()}
              {index < availableLanguages.length - 1 && (
                <span className="mx-1 opacity-50 font-normal">|</span>
              )}
            </span>
          ))}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
