import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function About() {
  return (
    <>
      <Helmet>
        <title>About | Cem Altun</title>
        <meta name="description" content="About Cem Altun — composer, arranger and sound designer based in Zürich." />
      </Helmet>
      <Sidebar />
      <section className="pt-32 pb-20 px-6 md:px-24 min-h-screen bg-[#050505] text-white">
        <div className="max-w-3xl mx-auto">
          <nav className="flex items-center gap-4 mb-12 font-manrope text-[10px] tracking-[0.3em] uppercase">
            <Link to="/" className="opacity-60 hover:opacity-100">HOME</Link>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="opacity-60">ABOUT</span>
          </nav>
          <h1 className="font-urbanist text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-8">About</h1>
          <p className="font-manrope font-light text-gray-300 leading-loose text-base md:text-lg mb-6">
            Cem Altun is a composer, arranger, and sound designer based in Zürich, Switzerland. He specializes in film scores, video game music, theater music, orchestration, and cinematic piano compositions. A graduate of the Zurich University of the Arts (ZHdK) in Composition for Film, Theatre, and Media (CAS), he works across film, theater, video games, and digital media.
          </p>
          <p className="font-manrope font-light text-gray-300 leading-loose text-base md:text-lg mb-6">
            His work combines orchestral writing with modern sound design, creating immersive scores for interactive and linear media. He collaborates with directors, game studios, and theaters internationally.
          </p>
          <p className="font-manrope font-light text-gray-300 leading-loose text-base md:text-lg">
            Based in Zürich; available for commissions worldwide.
          </p>
        </div>
      </section>
    </>
  );
}
