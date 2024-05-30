import PropTypes from 'prop-types';

export default function SearchBar({ search, setSearch, user }) {
  return (
    <div className="w-100">
      <form role="search">
        <input
          type="search"
          className="form-control mx-2 my-2 fs-5"
          placeholder="Artists, Songs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search"
          disabled={!user ? true : false}
        />
      </form>
    </div>
  );
}
SearchBar.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  user: PropTypes.object,
};
