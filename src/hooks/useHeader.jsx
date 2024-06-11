import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function useHeader() {
  const [query, setQuery] = useState('');
  const [{ search, setSearch }] = useContext(AppContext);

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
  return { query, setQuery };
}

export default useHeader;
