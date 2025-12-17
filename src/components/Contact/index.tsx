import { useTranslation } from "react-i18next";

const Contact = () => {
  const { t } = useTranslation();

  const email = "info@cemaltun.com";

  // Cem Abi'nin gerçek verileriyle oluşturulan liste
  const links = [
    {
      name: "Instagram",
      url: "https://www.instagram.com/cem_altun/"
    },
    {
      name: "Facebook",
      url: "https://www.facebook.com/sanalozan/"
    },
    {
      name: "Spotify",
      // Buraya Sanatçı Profili linkini koyuyoruz (daha önce bulduğumuz Artist ID)
      url: "https://open.spotify.com/artist/11iL36m7FZC8toXhnY3Qzj"
    },
    {
      // Arkadaşının yaptığı siteyi domain adıyla eklemek en şık duranıdır
      name: "cemaltun.com.tr",
      url: "https://cemaltun.com.tr/"
    }
  ];

  return (
    <section
      id="contact"
      className="w-full h-screen flex flex-col justify-between bg-[#f5f5f5] px-6 py-20 md:px-20 md:py-32 overflow-hidden"
    >
      {/* ÜST KISIM: Başlık ve Büyük E-posta */}
      <div className="flex flex-col space-y-8 mt-10 md:mt-20">
        <h2 className="text-[10px] font-manrope font-bold tracking-[0.5em] uppercase opacity-40 text-black">
          {t('common.contact') || 'CONTACT'}
        </h2>

        <a
          href={`mailto:${email}`}
          className="block text-4xl sm:text-6xl md:text-[7vw] font-isidora font-light tracking-tight text-black hover:italic hover:opacity-70 transition-all duration-500 ease-out leading-none break-all md:break-normal"
        >
          {email}
        </a>

        {/* İsviçre ve Türkiye Bayraklarına atıf - Lokasyon Bilgisi */}
        <p className="text-sm font-manrope opacity-50 pl-1 mt-4 text-black">
          Based in Switzerland & Turkey
        </p>
      </div>

      {/* ALT KISIM: Linkler ve Copyright */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-t border-black/10 pt-10">

        {/* Linkler Listesi */}
        <div className="flex flex-wrap gap-x-8 gap-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] font-manrope font-bold tracking-[0.25em] uppercase text-black opacity-40 hover:opacity-100 transition-opacity duration-300"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div className="text-[9px] font-manrope opacity-30 tracking-[0.2em] uppercase text-black text-right leading-relaxed">
          © {new Date().getFullYear()} Cem Altun. <br />
          Composer / Film, Theater & Media.
        </div>
      </div>
    </section>
  );
};

export default Contact;
