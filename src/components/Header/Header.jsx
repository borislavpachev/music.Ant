import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { ThemeContext } from '../../contexts/theme';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import SearchBar from '../SearchBar/SearchBar';
import { PropTypes } from 'prop-types';
import './Header.css';

export default function Header({ user, logout }) {
  const [{ search, setSearch }] = useContext(AppContext);
  const [{ theme, isDark }] = useContext(ThemeContext);
  const [query, setQuery] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParams = urlParams.get('query');
    if (queryParams) {
      setQuery(queryParams);
    }
  }, []);

  useEffect(() => {
    if (search && location.pathname !== '/search') {
      navigate('/search');
    }
  }, [search, location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname !== '/search') {
      setQuery('');
      setSearch('');
      setTimeout(() => {
        navigate(location.pathname);
      }, 100);
    }
  }, [location.pathname, setSearch, navigate]);

  return (
    <nav
      className={`navbar navbar-expand-md d-flex align-items-center
    p-2 bg-${theme.color} text-${theme.textColor} ${
        isDark ? 'header-dark' : 'header-light'
      }`}
    >
      <div className="container-fluid">
        <NavLink
          to="/home"
          className="d-flex bg-light rounded align-items-center m-1"
        >
          <img
            src="/ant_logo1.png"
            alt="logo"
            style={{ height: '65px', width: '70px' }}
          />
        </NavLink>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarContent">
          <SearchBar user={user} query={query} setQuery={setQuery} />
          <ul className="navbar-nav align-items-center justify-content-center gap-2">
            <li className="nav-item ms-4">
              {!user ? (
                <Login />
              ) : (
                <span className="fs-5 p-2">
                  Welcome,
                  <NavLink
                    to={'/profile'}
                    className="ms-2 fs-4"
                    style={{ textDecoration: 'none', color: 'green' }}
                  >
                    {user.display_name}
                  </NavLink>
                </span>
              )}
            </li>
            {user && (
              <li className="nav-item">
                <button className="btn btn-danger" onClick={logout}>
                  Logout
                </button>
              </li>
            )}
            <li className="nav-item">
              <ThemeSwitch />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

Header.propTypes = {
  user: PropTypes.object,
  logout: PropTypes.func,
};
