import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function CustomTooltip({ text, tooltipText, font }) {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-title`} style={{ position: 'fixed' }}>
          {tooltipText}
        </Tooltip>
      }
    >
      <span style={{ cursor: 'pointer', fontSize: `${font}`, whiteSpace: 'nowrap'}}>{text}</span>
    </OverlayTrigger>
  );
}

CustomTooltip.propTypes = {
  text: PropTypes.string,
  tooltipText: PropTypes.string,
  font: PropTypes.string,
};
