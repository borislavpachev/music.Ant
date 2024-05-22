import { useEffect, useState } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { PropTypes } from 'prop-types';
import './MusicPlayer.css';

export default function MusicPlayer({ uri, setTrack }) {
  const [token, setToken] = useState(null);

  useEffect(() => {
    let authToken = localStorage.getItem('spotifyToken');
    setToken(authToken);
  }, []);

  if (!token) return;
  return (
    <div className="music-player d-flex flex-column bg-success 
    align-items-end p-1">
      <SpotifyPlayer
        token={token}
        play={true}
        showSaveIcon={true}
        uris={uri ? [uri] : []}
        styles={{ sliderColor: 'green#00B500' }}
      />
      <button className="btn btn-danger mt-1" onClick={() => setTrack(null)}>
        Close
      </button>
    </div>
  );
}

MusicPlayer.propTypes = {
  uri: PropTypes.string,
  setTrack: PropTypes.func,
};
