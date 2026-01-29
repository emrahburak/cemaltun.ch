import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t("notFound.title")} | Cem Altun</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <Sidebar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-20 px-6 md:px-24 min-h-screen bg-[#050505] text-white selection:bg-white/20 flex flex-col justify-center"
      >
        <div className="max-w-3xl mx-auto w-full">

          {/* BREADCRUMB - Minimalist Navigation */}
          <motion.nav
            initial={{ x: -10, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex items-center gap-4 mb-12 font-manrope text-[10px] tracking-[0.3em] uppercase"
          >
            <Link
              to="/"
              className="opacity-60 hover:opacity-100 transition-opacity duration-300 flex items-center gap-2 text-lg"
            >
              <span>{t("navbar.home") || "HOME"}</span>
            </Link>
            <span className="w-1 h-1 bg-white/20 rounded-full"></span>
            <span className="opacity-60 cursor-default text-lg uppercase">
              ERROR 404
            </span>
          </motion.nav>

          {/* MAIN CONTENT */}
          <div className="space-y-8">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="font-urbanist text-6xl md:text-9xl font-bold tracking-tighter uppercase leading-none"
            >
              404
            </motion.h1>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="group"
            >
              <h2 className="text-xl md:text-2xl text-white font-urbanist font-medium uppercase tracking-[0.1em] mb-6 flex items-center gap-4">
                <span className="w-12 h-[1px] bg-white/40"></span>
                {t("notFound.heading")}
              </h2>

              <p className="font-manrope font-light text-gray-500 pl-16 leading-loose max-w-xl text-base md:text-lg">
                {t("notFound.description")}
              </p>
            </motion.div>

            {/* CALL TO ACTION */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-12 pl-16"
            >
              <Link
                to="/"
                className="inline-block px-10 py-4 border border-white/10 text-white font-manrope text-[10px] tracking-[0.3em] uppercase hover:bg-white hover:text-black transition-all duration-500 ease-in-out"
              >
                {t("notFound.button")}
              </Link>
            </motion.div>
          </div>

          {/* FOOTER SIGNATURE */}
          <div className="pt-24 border-t border-white/5 mt-20">
            <p className="text-[10px] opacity-20 tracking-widest uppercase italic font-manrope">
              Cem Altun — Zürich, Switzerland
            </p>
          </div>
        </div>
      </motion.section>
    </>
  );
}
