import { createContext, useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const themeState = JSON.parse(localStorage.getItem('isDark'));
    if (themeState !== null) {
      setIsDark(themeState);
    }
  }, []);

  const theme = isDark
    ? {
        color: 'dark',
        textColor: 'white',
      }
    : {
        color: 'light',
        textColor: 'black',
      };

  const toggleTheme = () => {
    setIsDark((prevIsDark) => {
      const newIsDark = !prevIsDark;
      localStorage.setItem('isDark', newIsDark);
      return newIsDark;
    });
  };

  return (
    <ThemeContext.Provider value={[{ theme, isDark }, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.any,
};
