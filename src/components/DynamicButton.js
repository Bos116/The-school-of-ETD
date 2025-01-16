import React from 'react';
import PropTypes from 'prop-types';
import './DynamicButton.css'; // Import the CSS file for styling

const DynamicButton = ({
  label,
  variant = 'primary',
  size = '',
  outline = false,
  onClick = () => {},
  disabled = false,
}) => {
  const className = `custom-btn ${outline ? 'outline' : ''} ${variant} ${size}`;

  return (
    <button className={className} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

DynamicButton.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']),
  size: PropTypes.oneOf(['lg', 'sm', '']),
  outline: PropTypes.bool,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default DynamicButton;

