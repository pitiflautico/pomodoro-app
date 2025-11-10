import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Theme } from '../types';
import { lightTheme, darkTheme } from '../constants/themes';
import StorageService from '../services/storage';

interface ThemeContextType {
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = async () => {
    const settings = await StorageService.getAppSettings();
    setIsDark(settings.theme === 'dark');
  };

  const toggleTheme = async () => {
    const newTheme = !isDark;
    setIsDark(newTheme);

    const settings = await StorageService.getAppSettings();
    settings.theme = newTheme ? 'dark' : 'light';
    await StorageService.saveAppSettings(settings);
  };

  const theme = isDark ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
