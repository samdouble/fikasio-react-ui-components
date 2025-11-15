import { useEffect } from 'react';

const allowedThemes = ['light', 'dark'];
const defaultTheme = 'light';
let theme = defaultTheme;

export function useTheme(newTheme?: string) {
  useEffect(() => {
    if (newTheme) {
      if (!allowedThemes.includes(newTheme)) {
        console.error('Theme must be one of these values:', ...allowedThemes);
        return;
      }
      theme = newTheme;
    }
  }, [newTheme]);

  return theme;
}

export default useTheme;
