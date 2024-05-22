import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { FiSun } from 'react-icons/fi';
import { FiMoon } from 'react-icons/fi';

export default function ThemeSwitch() {
  const [{ isDark }, toggleTheme] = useContext(ThemeContext);

  return (
    <button
      className={`btn btn-${
        isDark ? 'light' : 'dark'
      } d-flex justify-content-center align-items-center px-4 py-2 fs-5`}
      onClick={toggleTheme}
    >
      {isDark ? <FiSun /> : <FiMoon />}
    </button>
  );
}
