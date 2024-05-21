import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { FiSun } from 'react-icons/fi';
import { FiMoon } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import Login from '../Login/Login';
import { PropTypes } from 'prop-types';
import './Header.css';

export default function Header({ user, logout, search, setSearch }) {
  const [{ theme, isDark }, toggleTheme] = useContext(ThemeContext);

  return (
    <nav
      className={`navbar navbar-expand-lg d-flex justify-content-between align-items-center
    p-3 bg-${theme.color} text-${theme.textColor} ${
        isDark ? 'header-dark' : 'header-light'
      }`}
    >
      <div
        className={`d-flex bg-${theme.color === 'dark' ? 'light' : 'light'} 
  rounded align-items-center`}
      >
        <NavLink to="/home">
          <img src="/ant_logo.png" alt="logo" />
        </NavLink>
      </div>
      <input
        type="search"
        className="form-control mx-4 fs-5"
        placeholder="Artists, Songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="d-flex gap-2 align-items-center">
        {!user ? (
          <Login />
        ) : (
          <div className="d-flex align-items-center justify-content-center gap-2">
            <span className="fs-5">Welcome, {user.display_name}</span>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        )}
        <NavLink to="/about">
          <button className="btn btn-secondary">About</button>
        </NavLink>
        <button
          className={`btn btn-${
            isDark ? 'light' : 'dark'
          } d-flex justify-content-center align-items-center px-4 py-2 fs-5`}
          onClick={toggleTheme}
        >
          {isDark ? <FiSun /> : <FiMoon />}
        </button>
      </div>
    </nav>
  );
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
  search: PropTypes.string,
  setSearch: PropTypes.func,
};
