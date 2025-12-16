// src/components/Navbar.tsx

import { useTheme } from "../../context/ThemeContext";


const Navbar = () => {

  const { isDarkBackground } = useTheme();
  // Eğer Zemin Koyu ise (true), yazı BEYAZ. Yoksa (false) yazı SİYAH.
  const textColorClass = isDarkBackground ? "text-white" : "text-black";

  return (
    <nav className="sticky top-0 z-50 w-full h-24 flex justify-center items-center bg-transparent transition-all duration-300">
      <ul
        // Burada genel bir renk sınıfı BIRAKMIYORUZ. Sadece geçişi ve font ayarlarını tutuyoruz.
        className={`flex gap-12 text-sm font-manrope font-medium tracking-[0.2em] uppercase opacity-90 transition-colors duration-500`}
      >

        {/* KRİTİK DEĞİŞİKLİK: Rengi doğrudan LI elementine atıyoruz */}
        <li className={`cursor-pointer hover:opacity-70 transition-opacity ${textColorClass}`}>Home</li>
        <li className={`cursor-pointer hover:opacity-70 transition-opacity ${textColorClass}`}>About</li>
        <li className={`cursor-pointer hover:opacity-70 transition-opacity ${textColorClass}`}>Works</li>
        <li className={`cursor-pointer hover:opacity-70 transition-opacity ${textColorClass}`}>Contact</li>

      </ul>
    </nav>
  );
};

export default Navbar;
