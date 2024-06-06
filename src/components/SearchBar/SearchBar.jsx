import PropTypes from 'prop-types';
import { useContext, useEffect } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ user, query, setQuery }) {
  const [{ setSearch }] = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    setSearch(query);
    if (!query) return;
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  }, [query, setSearch, navigate]);

  const handleQuery = (e) => {
    setQuery(e.target.value);
  };

  const handleClear = () => {
    setQuery('');
    setSearch('');
    navigate('/search');
  };

  return (
    <div className="w-100">
      <form role="search">
        <input
          type="search"
          id="general-search"
          className="form-control mx-2 my-2 fs-5"
          placeholder="Artists, Songs..."
          value={query}
          onChange={handleQuery}
          onReset={handleClear}
          aria-label="Search"
          disabled={!user ? true : false}
        />
      </form>
    </div>
  );
}
SearchBar.propTypes = {
  user: PropTypes.object,
  query: PropTypes.string,
  setQuery: PropTypes.func,
};
