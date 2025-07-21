import { createContext, useState, useEffect, useContext } from 'react';
import type { ReactNode } from 'react';

interface ThemeContextType {
  mode: string;
  toggleMode: () => void;
}

// Create the context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// ThemeProvider component
export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [mode, setMode] = useState<string>(() => localStorage.getItem('mode') || 'light');

  useEffect(() => {
    document.body.style.backgroundColor = mode === 'dark' ? 'rgb(17, 24, 39)' : 'white';
    localStorage.setItem('mode', mode);
  }, [mode]);

  const toggleMode = () => {
    setMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
