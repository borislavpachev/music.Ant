import { useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { PropTypes } from 'prop-types';
import './MusicPlayer.css';
import { ThemeContext } from '../../contexts/theme';
import useAuth from '../../customHooks/useAuth';

export default function MusicPlayer({ uri, setTrack }) {
  const [{ isDark }] = useContext(ThemeContext);
  const { accessToken } = useAuth();

  if (!accessToken) return;
  return (
    <div
      className="music-player d-flex flex-column bg-success 
    align-items-end p-1"
    >
      <SpotifyPlayer
        token={accessToken}
        play={true}
        showSaveIcon={true}
        uris={uri ? [uri] : []}
        styles={{
          sliderColor: '#00B500',
          bgColor: isDark ? '#343a40' : '#f8f9fa',
          color: isDark ? '#f8f9fa' : '#343a40',
        }}
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
