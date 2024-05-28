import { Tooltip, OverlayTrigger } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function CustomTooltip({ text, tooltipText }) {
  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip id={`tooltip-title`} style={{position:"fixed"}}
        >
          {tooltipText}
        </Tooltip>
      }
    >
      <h5>{text}</h5>
    </OverlayTrigger>
  );
}

CustomTooltip.propTypes = {
  text: PropTypes.string,
  tooltipText: PropTypes.string,
};
