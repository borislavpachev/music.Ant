import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import CustomTooltip from '../CustomTooltip/CustomTooltip';
import { CiPlay1, CiCircleInfo } from 'react-icons/ci';
import { AppContext } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';

export default function PlaylistMiniCard({ playlist }) {
  const [{ theme, isDark }] = useContext(ThemeContext);
  const [{ setCurrentlyPlayingTrack }] = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <>
      <div
        className={`card align-items-center mx-2 my-1
      ${
        isDark
          ? `profile-dark  bg-${theme.color} text-${theme.textColor}`
          : `profile-light bg-${theme.color} text-${theme.textColor}`
      }`}
        style={{ width: '12rem', height: '11rem' }}
      >
        <img
          src={`${playlist.image}`}
          alt="playlist"
          style={{ height: '100px', width: '115px' }}
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
              <div className='d-flex gap-1'>
                <button
                  onClick={() => navigate(`/playlist/${playlist.id}`)}
                  className="btn btn-primary px-2 justify-content-center align-items-center"
                >
                  <CiCircleInfo className="fs-5" />
                </button>
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
      </div>
    </>
  );
}

PlaylistMiniCard.propTypes = {
  playlist: PropTypes.object,
};
