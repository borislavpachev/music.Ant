import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { CiPlay1 } from 'react-icons/ci';
import { AppContext } from '../../contexts/AppContext';

export default function PlaylistCard({ playlist }) {
  const [{ theme, isDark }] = useContext(ThemeContext);
  const [{ setCurrentlyPlayingTrack }] = useContext(AppContext);

  return (
    <>
      <div
        className={`card align-items-center mx-2 my-1
      ${
        isDark
          ? `profile-dark  bg-${theme.color} text-${theme.textColor}`
          : `profile-light bg-${theme.color} text-${theme.textColor}`
      }`}
        style={{ width: '10.5rem', height: '10.5rem' }}
      >
        <img
          src={`${playlist.image}`}
          alt="playlist"
          style={{ height: '90px', width: '110px' }}
          className="my-1"
        />
        <div className="d-flex w-100 px-1">
          <div className="w-100">
            <span
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              <CustomTooltip
                text={playlist.name}
                tooltipText={playlist.name}
                font={'18px'}
              />
            </span>
            <div
              style={{ whiteSpace: 'nowrap' }}
              className="d-flex align-items-center 
              justify-content-between"
            >
              <span>Tracks: {playlist.tracksCount}</span>
              <button
                className="btn btn-success justify-content-center align-items-center
              "
                onClick={() => setCurrentlyPlayingTrack(playlist.uri)}
              >
                <CiPlay1 className="fs-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

PlaylistCard.propTypes = {
  playlist: PropTypes.object,
};
