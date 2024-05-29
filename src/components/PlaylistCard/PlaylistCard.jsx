import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';
import CustomTooltip from '../CustomTooltip/CustomTooltip';

export default function PlaylistCard({ playlist }) {
  const [{ theme, isDark }] = useContext(ThemeContext);

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
          style={{ height: '110px', width: '130px' }}
          className="my-1"
        />
        <div className="d-flex align-items-start w-100 ms-3">
          <div>
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
            <p>Tracks: {playlist.tracksCount}</p>
          </div>
        </div>
      </div>
    </>
  );
}

PlaylistCard.propTypes = {
  playlist: PropTypes.object,
};
