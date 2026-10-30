import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function Contact() {
  return (
    <>
      <Helmet>
        <title>Contact | Cem Altun</title>
        <meta name="description" content="Contact Cem Altun for commissions and collaborations." />
      </Helmet>
      <Sidebar />
      <section className="pt-32 pb-20 px-6 md:px-24 min-h-screen bg-[#050505] text-white">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-4 mb-12 font-manrope text-[10px] tracking-[0.3em] uppercase">
            <Link to="/" className="opacity-60 hover:opacity-100">HOME</Link>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="opacity-60">CONTACT</span>
          </nav>
          <h1 className="font-urbanist text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8">Contact</h1>
          <p className="font-manrope font-light text-gray-300 leading-loose text-base md:text-lg mb-6">
            For commissions, collaborations, and inquiries, please reach out via email or social channels. Cem Altun is available for film, theater, and video game projects worldwide.
          </p>
          <ul className="font-manrope font-light text-gray-300 leading-loose text-base md:text-lg space-y-2">
            <li>Instagram: <a className="underline" href="https://www.instagram.com/cem_altun/">@cem_altun</a></li>
            <li>LinkedIn: <a className="underline" href="https://www.linkedin.com/in/cem-altun-31037515b/">Cem Altun</a></li>
            <li>Spotify: <a className="underline" href="https://open.spotify.com/intl-tr/artist/11iL36m7FZC8toXhnY3Qzj">Cem Altun</a></li>
            <li>IMDb: <a className="underline" href="https://www.imdb.com/name/nm10851893/">nm10851893</a></li>
          </ul>
        </div>
      </section>
    </>
  );
}
