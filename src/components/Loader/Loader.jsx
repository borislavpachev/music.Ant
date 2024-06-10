import { PropTypes } from 'prop-types';
import { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme';

export default function Loader({ size }) {
  const [{ theme, isDark }] = useContext(ThemeContext);

  return (
    <div
      className={`h-100 d-flex justify-content-center align-items-center
    ${
      isDark
        ? `bg-${theme.color} text-${theme.textColor} border border-white`
        : `bg-${theme.color} text-${theme.textColor} border border-dark`
    }`}
    >
      <div
        style={{ width: `${size}`, height: `${size}` }}
        className="spinner-border text-success"
        role="status"
      >
        <span className="sr-only"></span>
      </div>
    </div>
  );
}

Loader.propTypes = {
  size: PropTypes.string,
};
