import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Link } from "react-router-dom"; // Navigasyon için ekledik
import Sidebar from "../components/Sidebar";

export default function Privacy() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('privacy.meta_title')}</title>
        <meta name="robots" content="noindex" />
      </Helmet>


      <Sidebar />
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-20 px-6 md:px-24 min-h-screen bg-[#050505] text-white selection:bg-white/20"
      >
        <div className="max-w-3xl mx-auto">

          {/* BREADCRUMB - Zürich Minimalist Design */}
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
              <span>{t('navbar.home') || 'HOME'}</span>
            </Link>

            <span className="w-1 h-1 bg-white/20 rounded-full"></span>

            <span className="opacity-60 cursor-default text-lg">
              {t('privacy.title')}
            </span>
          </motion.nav>

          {/* BAŞLIK */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="font-urbanist text-5xl md:text-7xl font-bold tracking-tighter uppercase mb-2"
          >
            {t('privacy.title')}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.3 }}
            className="font-manrope text-[10px] tracking-[0.4em] uppercase mb-16"
          >
            {t('privacy.last_updated')}: {new Date().toLocaleDateString()}
          </motion.p>

          <div className="space-y-16 font-manrope font-light text-sm md:text-base leading-relaxed">
            {['general', 'data', 'cookies', 'rights'].map((section, index) => (
              <motion.div
                key={section}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className="group"
              >
                <h2 className="text-sm font-bold text-white/90 mb-6 uppercase tracking-[0.2em] font-urbanist flex items-center gap-4">
                  <span className="w-8 h-[1px] bg-white/10 group-hover:w-12 group-hover:bg-white/40 transition-all duration-500"></span>
                  {t(`privacy.sections.${section}.title`)}
                </h2>
                <p className="text-gray-500 pl-12 leading-loose">
                  {t(`privacy.sections.${section}.content`)}
                </p>
              </motion.div>
            ))}

            <div className="pt-20 border-t border-white/5 mt-20">
              <p className="text-[10px] opacity-20 tracking-widest uppercase italic">
                Cem Altun — Zürich, Switzerland
              </p>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
