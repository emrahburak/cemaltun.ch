import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import './i18n'; // <--- BU SATIRI EKLE (Ayar dosyası çalışsın)
import { HelmetProvider } from "react-helmet-async"; // Bunu ekle

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider> {/* Tüm yapıyı sarmala */}
      <App />
    </HelmetProvider>
  </StrictMode>,
)
