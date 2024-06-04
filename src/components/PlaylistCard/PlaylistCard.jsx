import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { CiClock2 } from 'react-icons/ci';
import { ThemeContext } from '../../contexts/theme';
import './PlaylistCard.css';
import { AppContext } from '../../contexts/AppContext';

export default function PlaylistCard({ track, index }) {
  const [{ theme, isDark }] = useContext(ThemeContext);
  const [{ currentlyPlayingTrack, setCurrentlyPlayingTrack }] =
    useContext(AppContext);

  const millisecondsToMinutes = (timeInMilliseconds) => {
    const minutes = Math.floor(timeInMilliseconds / 1000 / 60);
    const seconds = Math.floor((timeInMilliseconds / 1000) % 60);
    return `${minutes}:${seconds}`;
  };

  const handlePlay = () => {
    setCurrentlyPlayingTrack(track.uri);
  };

  const custom = currentlyPlayingTrack?.includes(track.id)
    ? 'custom-style'
    : null;

  return (
    <div
      style={{ cursor: 'pointer' }}
      className={`card d-flex my-1 border ${custom}
      ${
        isDark
          ? `bg-${theme.color} text-${theme.textColor}`
          : `bg-${theme.color} text-${theme.textColor}`
      }`}
      onClick={handlePlay}
    >
      <div
        className="card-body d-flex text-center
        align-items-center justify-content-between"
      >
        <p className="col-1"># {index + 1}</p>
        <img
          className="col-2"
          src={`${track.album.images[0].url}`}
          alt="album-cover"
          style={{ width: '75px', height: '75px' }}
        />
        <p
          className="col-4"
          style={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          <strong>{track.name}</strong>
        </p>
        <p>{track.artists[0].name}</p>
        <p className="col-4">
          <span
            className="fst-italic"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {track.album.name}
          </span>
        </p>
        <p className="col-1 d-flex align-items-center">
          <CiClock2 className="fs-4 me-1" />
          {millisecondsToMinutes(track.duration_ms)}
        </p>
      </div>
    </div>
  );
}

PlaylistCard.propTypes = {
  currentlyPlaying: PropTypes.string,
  track: PropTypes.object,
  index: PropTypes.number,
};
