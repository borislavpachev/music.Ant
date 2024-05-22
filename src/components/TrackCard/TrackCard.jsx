import { PropTypes } from 'prop-types';
import './TrackCard.css';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';

export default function TrackCard({ result, key }) {
  const [{ theme, isDark }] = useContext(ThemeContext);

  return (
    <div
      key={key}
      className={`card align-items-center m-2 border
      ${
        isDark
          ? `bg-${theme.color} text-${theme.textColor}`
          : `bg-${theme.color} text-${theme.textColor}`
      }`}
      style={{ width: '18rem', height: '25rem' }}
    >
      <img
        src={`${result.albumCover}`}
        alt="cover"
        className="card-img-top p-3"
      />
      <div className="card-body">
        <h5>{result.trackName}</h5>
        <p>{result.artist}</p>
      </div>
    </div>
  );
}

TrackCard.propTypes = {
  result: PropTypes.object,
  key: PropTypes.any,
};
