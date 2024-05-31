import { createContext, useState } from 'react';
import { PropTypes } from 'prop-types';

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [currentlyPlayingTrack, setCurrentlyPlayingTrack] = useState(null);


  return (
    <AppContext.Provider
      value={[
        {
          search,
          searchResults,
          setSearch,
          setSearchResults,
          currentlyPlayingTrack,
          setCurrentlyPlayingTrack,
        },
      ]}
    >
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.any,
};
