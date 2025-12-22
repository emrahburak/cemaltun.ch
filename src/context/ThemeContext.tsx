import React, { createContext, useContext, useState } from 'react';

interface ThemeContextType {
  isDarkBackground: boolean;
  setIsDarkBackground: (isDark: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // BAŞLANGIÇ ÇOK ÖNEMLİ: İlk açılışta Hero var, yani KOYU zemin (True)
  const [isDarkBackground, setIsDarkBackground] = useState(true);

  return (
    <ThemeContext.Provider value={{ isDarkBackground, setIsDarkBackground }}>
      {children}
    </ThemeContext.Provider>
  );
};
