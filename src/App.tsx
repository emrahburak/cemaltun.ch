// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Privacy from './pages/privacy';
import ScrollToTop from './utils/ScrollTop';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    // 1. Sayfa Başlığını (Title) Güncelle
    document.title = t('metadata.title');

    // 2. Meta Description'ı Güncelle
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', t('metadata.description'));
    }

    // 3. HTML 'lang' özniteliğini güncelle (SEO için çok önemli)
    document.documentElement.lang = i18n.language;

  }, [i18n.language, t]);

  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Ana Sayfa */}
          <Route path="/" element={<Home />} />

          {/* Gizlilik Sayfası */}
          <Route path="/privacy" element={<Privacy />} />

          {/* Olmayan bir sayfaya girilirse ana sayfaya atabiliriz veya 404 yapabiliriz */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>

    </>
  );
}

export default App;
