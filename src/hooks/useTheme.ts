import { useState, useEffect, useCallback } from 'react';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem('theme') as Theme | null;
  if (stored === 'dark' || stored === 'light') {
    return stored;
  }
  
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
};

export const useTheme = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    const initial = getInitialTheme();
    // Ensure DOM is updated immediately
    if (typeof document !== 'undefined') {
      document.documentElement.classList.remove('light', 'dark');
      document.documentElement.classList.add(initial);
    }
    return initial;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add current theme class
    root.classList.add(theme);
    
    // Save to localStorage
    try {
      localStorage.setItem('theme', theme);
    } catch (error) {
      console.warn('Failed to save theme:', error);
    }
  }, [theme]);

  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light';
      return newTheme;
    });
  }, []);

  return { theme, toggleTheme, isDark: theme === 'dark' };
};

