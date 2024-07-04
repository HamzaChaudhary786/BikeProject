import { useEffect, useState } from 'react';

const useIsDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleMediaQueryChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    // Set the initial value
    setIsDarkMode(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleMediaQueryChange);

    // Cleanup
    return () => mediaQuery.removeEventListener('change', handleMediaQueryChange);
  }, []);

  return isDarkMode;
};

export default useIsDarkMode;
