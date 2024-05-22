import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { CiPlay1 } from 'react-icons/ci';
import './TrackMusicCard.css';

export default function TrackMusicCard({ result, selectTrack }) {
  const [{ theme, isDark }] = useContext(ThemeContext);

  return (
    <>
      <div
        className={`card align-items-center m-2 border
      ${
        isDark
          ? `bg-${theme.color} text-${theme.textColor}`
          : `bg-${theme.color} text-${theme.textColor}`
      }`}
        style={{ width: '18rem', height: '24rem' }}
      >
        <img
          src={`${result.albumCover}`}
          alt="cover"
          className="card-img-top p-2"
        />
        <div
          className="card-body d-flex
        align-items-start w-100"
        >
          <div className="h-100 w-100">
            <div
              style={{
                height: '35%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <h5 title={`${result.trackName}`}>{result.trackName}</h5>
            </div>
            <p>{result.artist}</p>
          </div>
          <div className="h-100 m-1">
            <button
              className="btn btn-success justify-content-center
               align-items-center"
              onClick={() => selectTrack(result.uri)}
            >
              <CiPlay1 className="fs-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

TrackMusicCard.propTypes = {
  result: PropTypes.object,
  selectTrack: PropTypes.func,
};
