import React from 'react';
import DynamicButton from './DynamicButton';
import './DynamicCard.css'; // Import the CSS file for styling

function DynamicCard({ imgSrc, title, text, label, onButtonClick, width, imgWidth, imgHeight }) {
  const imgStyle = {
    width: imgWidth,
    height: imgHeight,
    objectFit: 'cover',
  };

  return (
    <div className="custom-card" style={{ width: width }}>
      <div className="custom-card-img-wrapper">
        <img src={imgSrc} alt={title} style={imgStyle} className="custom-card-img" />
      </div>
      <div className="custom-card-body">
        <h5 className="custom-card-title">{title}</h5>
        <p className="custom-card-text">{text}</p>
        <DynamicButton variant="primary" onClick={onButtonClick} label={label}></DynamicButton>
      </div>
    </div>
  );
}

export default DynamicCard;
