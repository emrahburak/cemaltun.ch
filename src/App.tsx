// src/App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Privacy from './pages/privacy';
import ScrollToTop from './utils/ScrollTop';

function App() {
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
