import { useContext } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { PropTypes } from 'prop-types';
import './MusicPlayer.css';
import { ThemeContext } from '../../contexts/theme';
import { AppContext } from '../../contexts/AppContext';

export default function MusicPlayer({ token }) {
  const [{ currentlyPlayingTrack, setCurrentlyPlayingTrack }] =
    useContext(AppContext);
  const [{ isDark }] = useContext(ThemeContext);

  if (!token) return;
  return (
    <div
      className="music-player d-flex flex-column bg-success 
    align-items-end p-1"
    >
      <SpotifyPlayer
        token={token}
        play={true}
        uris={currentlyPlayingTrack ? [currentlyPlayingTrack] : []}
        styles={{
          sliderColor: '#28a745',
          bgColor: isDark ? '#343a40' : '#f8f9fa',
          color: isDark ? '#f8f9fa' : '#343a40',
          trackNameColor: isDark ? '#f8f9fa' : '#343a40',
        }}
      />
      <span
        onClick={() => setCurrentlyPlayingTrack(null)}
        style={{ cursor: 'pointer' }}
        className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
      >
        <span className="btn-close"></span>
      </span>
    </div>
  );
}

MusicPlayer.propTypes = {
  token: PropTypes.string,
  uri: PropTypes.string,
  setTrack: PropTypes.func,
};
