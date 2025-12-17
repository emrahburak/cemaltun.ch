import { useTranslation } from "react-i18next";

const Listen = () => {
  const { t } = useTranslation();

  // Cem Abi'nin oluşturduğu Playlist ID (Temiz ID)
  const playlistId = import.meta.env.VITE_SPOTIFY_PLAYLIST_ID;

  return (
    <section
      id="listen"
      className="w-full h-screen flex items-center justify-center bg-[#f5f5f5] px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

        {/* SOL TARAF */}
        <div className="lg:col-span-5 space-y-8">
          <div>
            <h2 className="text-[10px] font-manrope font-bold mb-4 tracking-[0.5em] uppercase opacity-40 text-black">
              {t('navbar.works')}
            </h2>
            <h3 className="text-5xl md:text-7xl font-isidora font-light leading-[1.1] tracking-tight text-black text-left">
              Stream <br />
              <span className="italic text-black/70 font-normal underline decoration-1 underline-offset-8">Online</span>
            </h3>
          </div>

          <p className="font-manrope text-sm md:text-base opacity-60 max-w-sm leading-relaxed border-l border-black/10 pl-6 text-black text-left italic">
            {t('listen.desc')}
          </p>

          <div className="pt-4 flex justify-start">
            <a
              // DÜZELTME 1: Linki standart Spotify web linki yaptık
              href={`https://open.spotify.com/playlist/${playlistId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 text-[10px] font-manrope font-bold tracking-[0.2em] uppercase text-black"
            >
              <span className="w-10 h-[1px] bg-black transition-all duration-500 group-hover:w-16"></span>
              Open in Spotify
            </a>
          </div>
        </div>

        {/* SAĞ TARAF: Playlist Embed */}
        <div className="lg:col-span-7 w-full h-[500px] md:h-[650px]">
          <iframe
            style={{ borderRadius: "12px" }}
            // DÜZELTME 2: Standart Embed URL yapısı (/embed/playlist/)
            src={`https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            frameBorder="0"
            // allow özellikleri tam, burası doğru
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Playlist"
          ></iframe>
        </div>

      </div>
    </section>
  );
};

export default Listen;
