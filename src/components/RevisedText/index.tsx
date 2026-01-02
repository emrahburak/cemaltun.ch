import React from "react";

interface RevisedTextProps {
  text: string;
  as?: React.ElementType; // h1, h2, span, Link (React Router) vb.
  stagger?: boolean;
  charShadow?: boolean;
  hoverUnderline?: boolean;
  className?: string;
}

/**
 * RevisedText: Projenin her yerinde tutarlı metin ve animasyon dili sağlar.
 * * Yol A (isAnimated): GSAP için harf harf parçalanmış yapı (Hero başlıkları vb.)
 * Yol B (Standard): Linkler ve menü elemanları için hover efektli yapı.
 */
const RevisedText: React.FC<RevisedTextProps & React.ComponentPropsWithoutRef<any>> = ({
  text,
  as: Tag = "span",
  stagger = false,
  charShadow = false,
  hoverUnderline = false,
  className = "",
  ...props // to, onClick, href gibi tüm ekstra propları toplar
}) => {
  const isAnimated = stagger || charShadow;

  // --- YOL A: KARMAŞIK ANİMASYONLU YAPI (Harf Harf) ---
  if (isAnimated) {
    return (
      <Tag
        {...props}
        aria-label={text} // SEO ve Erişilebilirlik için
        className={`${className} flex overflow-visible`}
        style={{ perspective: "1000px" }}
      >
        {text.split("").map((char, index) => (
          <span key={index} className="char-wrapper relative inline-block overflow-visible">
            {charShadow && (
              <span
                className="char-shadow absolute top-0 left-0 text-black/40 select-none pointer-events-none origin-bottom-left"
                style={{
                  whiteSpace: char === " " ? "pre" : "normal",
                  transform: "skewX(-45deg) scaleY(0.5) translateY(10px)",
                  filter: "blur(4px)",
                }}
              >
                {char}
              </span>
            )}
            <span
              className="char inline-block relative z-10"
              style={{ whiteSpace: char === " " ? "pre" : "normal" }}
            >
              {char}
            </span>
          </span>
        ))}
      </Tag>
    );
  }

  // --- YOL B: BASİT VE ETKİLEŞİMLİ YAPI (Linkler, Menü Elemanları) ---
  return (
    <Tag
      {...props}
      // w-fit eklendi: Bu, kutunun metinden daha fazla genişlemesini engeller.
      className={`${className} group relative inline-block w-fit transition-opacity duration-300`}
    >
      {/* Metin Katmanı */}
      <span className={`inline-block transition-transform duration-500 ease-out ${hoverUnderline ? "group-hover:-translate-y-1" : ""}`}>
        {text}
      </span>

      {/* Alt Çizgi */}
      {hoverUnderline && (
        <div
          className="absolute -bottom-1 left-0 w-0 h-[1px] bg-current group-hover:w-full transition-all duration-700 ease-in-out opacity-70 pointer-events-none"
        /* pointer-events-none: Çizginin tıklamaları engellememesi için */
        />
      )}
    </Tag>
  );
};

export default RevisedText;
