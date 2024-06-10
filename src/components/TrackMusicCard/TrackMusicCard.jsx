import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import { CiPlay1 } from 'react-icons/ci';
import CustomTooltip from '../CustomTooltip/CustomTooltip';

export default function TrackMusicCard({ track, selectTrack }) {
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
          src={`${track.albumCover}`}
          alt="cover"
          className="py-2"
          style={{
            height: '220px',
            width: '250px',
          }}
        />
        <div
          className="card-body d-flex
        align-items-start w-100"
        >
          <div className="h-100 w-75">
            <div
              className="track-title"
              style={{
                height: '25%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <CustomTooltip
                text={track.trackName}
                tooltipText={track.trackName}
                font={'23px'}
              />
            </div>
            <p>{track.artist}</p>
            {track.type ? <p>Type: {track.type}</p> : null}
          </div>
          <div className="h-100 m-1">
            <button
              className="btn btn-success justify-content-center
               align-items-center"
              onClick={() => selectTrack(track.uri)}
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
  track: PropTypes.object,
  selectTrack: PropTypes.func,
};
