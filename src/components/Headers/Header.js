import React from 'react';
import PropTypes from 'prop-types';
import './Header.css';

const Header = ({
  title,
  subtitle,
  backgroundImage,
  buttonText,
  buttonLink,
  backgroundOverlay,
  gradientBackground,
  titleFontSize,
  titleColor,
  subtitleFontSize,
  subtitleColor,
  buttonTextColor,
  buttonBgColor,
  animationType,
  videoBackground,
  customClass,
  buttons,
  contentAlignment,
}) => {
  const backgroundStyles = gradientBackground
    ? { background: gradientBackground }
    : { backgroundImage: `url(${backgroundImage})` };

  return (
    <header
      className={`hero ${customClass}`}
      style={backgroundStyles}
    >
      {backgroundOverlay && (
        <div className="hero-overlay" style={{ background: backgroundOverlay }}></div>
      )}
      {videoBackground && (
        <video className="hero-video" autoPlay muted loop>
          <source src={videoBackground} type="video/mp4" />
        </video>
      )}
      <div className={`hero-content ${animationType}`} style={{ textAlign: contentAlignment }}>
        <h1
          className="hero-title"
          style={{
            fontSize: titleFontSize,
            color: titleColor,
          }}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className="hero-subtitle"
            style={{
              fontSize: subtitleFontSize,
              color: subtitleColor,
            }}
          >
            {subtitle}
          </p>
        )}
        {buttons && buttons.length > 0 ? (
          <div className="hero-buttons">
            {buttons.map((button, index) => (
              <a
                key={index}
                href={button.link}
                className="hero-cta"
                style={{
                  backgroundColor: button.bgColor || buttonBgColor,
                  color: button.textColor || buttonTextColor,
                }}
              >
                {button.text}
              </a>
            ))}
          </div>
        ) : (
          buttonText && buttonLink && (
            <a
              href={buttonLink}
              className="hero-cta"
              style={{
                backgroundColor: buttonBgColor,
                color: buttonTextColor,
              }}
            >
              {buttonText}
            </a>
          )
        )}
      </div>
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  backgroundImage: PropTypes.string,
  buttonText: PropTypes.string,
  buttonLink: PropTypes.string,
  backgroundOverlay: PropTypes.string, // e.g., 'rgba(0, 0, 0, 0.5)'
  gradientBackground: PropTypes.string, // e.g., 'linear-gradient(...)'
  titleFontSize: PropTypes.string, // e.g., '3rem'
  titleColor: PropTypes.string, // e.g., 'white'
  subtitleFontSize: PropTypes.string, // e.g., '1.5rem'
  subtitleColor: PropTypes.string, // e.g., 'white'
  buttonTextColor: PropTypes.string, // e.g., 'white'
  buttonBgColor: PropTypes.string, // e.g., '#007bff'
  animationType: PropTypes.string, // e.g., 'fade-in' or 'slide-up'
  videoBackground: PropTypes.string, // URL to background video
  customClass: PropTypes.string, // Custom class for additional styles
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      link: PropTypes.string,
      textColor: PropTypes.string,
      bgColor: PropTypes.string,
    })
  ),
  contentAlignment: PropTypes.oneOf(['left', 'center', 'right']), // Text alignment
};

Header.defaultProps = {
  subtitle: '',
  backgroundImage: '',
  buttonText: '',
  buttonLink: '',
  backgroundOverlay: '',
  gradientBackground: '',
  titleFontSize: '3rem',
  titleColor: 'white',
  subtitleFontSize: '1.5rem',
  subtitleColor: 'white',
  buttonTextColor: 'white',
  buttonBgColor: '#007bff',
  animationType: '',
  videoBackground: '',
  customClass: '',
  buttons: [],
  contentAlignment: 'center',
};

export default Header;