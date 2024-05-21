import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { FiSun } from 'react-icons/fi';
import { FiMoon } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

  return (
    <header
      className={`d-flex justify-content-between align-items-center
    p-3 bg-${theme.color} text-${theme.textColor} ${
        isDark ? 'header-dark' : 'header-light'
      }`}
    >
      <input
        type="search"
        className="form-control w-50"
        placeholder="Artists, Songs..."
      />
      <div
        className={`d-flex bg-${theme.color === 'dark' ? 'light' : 'light'} 
      rounded align-items-center ms-5`}
      >
        <NavLink to="/home">
          <img src="/ant_logo.png" alt="logo" />
        </NavLink>
      </div>
      <div className="d-flex gap-2 align-items-center">
        <NavLink to="/about">
          <button className="btn btn-secondary px-3 py-2 fs-5">About</button>
        </NavLink>
        <button
          className={`btn btn-${
            isDark ? 'light' : 'dark'
          } d-flex justify-content-center align-items-center px-4 py-3`}
          onClick={toggleTheme}
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </header>
  );
}
