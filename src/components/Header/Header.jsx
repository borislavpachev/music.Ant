import { useContext, useEffect } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import Login from '../Login/Login';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { PropTypes } from 'prop-types';
import './Header.css';

export default function Header({ user, logout, search, setSearch }) {
  const [{ theme, isDark }] = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (search && location.pathname !== '/') navigate('/');
  }, [search, location.pathname, navigate]);

  useEffect(() => {
    if (location.pathname !== '/' && location.pathname !== '/home') {
      setSearch('');
    }
  }, [location.pathname]);

  return (
    <nav
      className={`navbar navbar-expand-lg d-flex justify-content-between align-items-center
    p-3 bg-${theme.color} text-${theme.textColor} ${
        isDark ? 'header-dark' : 'header-light'
      }`}
    >
      <div
        onClick={() => setSearch('')}
        className={`d-flex bg-${theme.color === 'dark' ? 'light' : 'light'} 
  rounded align-items-center`}
      >
        <NavLink to="/">
          <img
            src="/ant_logo1.png"
            alt="logo"
            style={{ height: '60px', width: '70px' }}
          />
        </NavLink>
      </div>
      <input
        type="search"
        className="form-control mx-3 my-2 fs-5 w-50"
        placeholder="Artists, Songs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        disabled={!user ? true : false}
      />

      <div className="d-flex gap-2 align-items-center">
        {!user ? (
          <Login />
        ) : (
          <div className="d-flex align-items-center justify-content-center gap-2">
            <span className="fs-5 mx-3 p-2">
              Welcome,
              <Link
                to={'/profile'}
                className="ms-2 fs-4"
                style={{ textDecoration: 'none', color: 'green' }}
              >
                {user.display_name}
              </Link>
            </span>
            <button className="btn btn-danger" onClick={logout}>
              Logout
            </button>
          </div>
        )}
        <NavLink to="/about" className="btn btn-secondary">
          About
        </NavLink>
        <ThemeSwitch />
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
