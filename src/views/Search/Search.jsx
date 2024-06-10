import { PropTypes } from 'prop-types';
import TrackMusicCard from '../../components/TrackMusicCard/TrackMusicCard';
import { useContext, useEffect, useState } from 'react';
import { getSearchResults } from '../../services/music.service';
import { AppContext } from '../../contexts/AppContext';
import toast from 'react-hot-toast';
import Loader from '../../components/Loader/Loader';

export default function Search({ logout }) {
  const [
    {
      search,
      setSearch,
      searchResults,
      setSearchResults,
      setCurrentlyPlayingTrack,
    },
  ] = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryParams = urlParams.get('query');
    if (queryParams) {
      setSearch(queryParams);
    }
  }, [setSearch]);

  useEffect(() => {
    if (!search) {
      setSearchResults([]);
      return;
    }
    setLoading(true);

    getSearchResults(search)
      .then((results) => {
        setLoading(false);
        if (results) {
          setSearchResults(
            results.map((track) => {
              return {
                artist: track.artists[0].name,
                trackName: track.name,
                uri: track.uri,
                albumCover: track.album.images[0].url,
              };
            })
          );
        }
      })
      .catch((error) => {
        if (error.message.includes('expired')) {
          logout();
        }
        toast.error(error.message);
      });
  }, [search]);

  const selectTrack = (track) => {
    setCurrentlyPlayingTrack(track);
  };

  if (loading) {
    return <Loader size="150px" />;
  }

  return (
    <div
      className={`container d-flex flex-column justify-content-center align-items-center
  `}
    >
      {searchResults.length === 0 ? (
        <div className="w-100 align-items-center justify-content-center">
          <div className="text-center rounded m-3 p-5 border">
            <h3>No search results</h3>
          </div>
        </div>
      ) : (
        <div className="custom-scroll row align-items-center justify-content-center">
          {searchResults.map((result, index) => {
            return (
              <TrackMusicCard
                track={result}
                key={index}
                selectTrack={selectTrack}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

Search.propTypes = {
  logout: PropTypes.func,
};
