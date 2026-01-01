import React from "react";

interface RevisedTextProps {
  text: string;
  as?: any; // h1, h2, span, a vb.
  stagger?: boolean;
  charShadow?: boolean;
  hoverUnderline?: boolean;
  className?: string;
  href?: string;
}

const RevisedText: React.FC<RevisedTextProps> = ({
  text,
  as: Tag = "span",
  stagger = false,
  charShadow = false,
  hoverUnderline = false,
  className = "",
  href,
}) => {
  // Harf harf parçalanma gerekiyor mu kontrolü
  const isAnimated = stagger || charShadow;

  // --- YOL A: KARMAŞIK ANİMASYONLU YAPI (Harf Harf) ---
  if (isAnimated) {
    return (
      <Tag
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

  // --- YOL B: BASİT YAPI (Bütünsel, Hover Efektli) ---
  return (
    <Tag
      href={href}
      className={`${className} group relative inline-block`}
    >
      <span className={`inline-block transition-transform duration-500 ${hoverUnderline ? "group-hover:-translate-y-1" : ""}`}>
        {text}
      </span>
      {hoverUnderline && (
        <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-700" />
      )}
    </Tag>
  );
};

export default RevisedText;
