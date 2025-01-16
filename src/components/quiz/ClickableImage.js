import React, { useState } from 'react';
import './ClickableImage.css'; // Optional CSS file for styling
import imageSrc from '../images/logo.svg'; // Adjust path to your image

const ClickableImage = () => {
  const [textboxes, setTextboxes] = useState([]);

  const handleImageClick = (event) => {
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; // X-coordinate relative to the image
    const y = event.clientY - rect.top; // Y-coordinate relative to the image

    // Add a new textbox at the clicked position
    setTextboxes([...textboxes, { x, y }]);
  };

  const handleTextboxClick = (event) => {
    // Prevent click propagation to the image wrapper
    event.stopPropagation();
  };

  return (
    <div className="image-container">
      <h1>Interactive Engineering Exploration</h1>
      <div className="image-wrapper" onClick={handleImageClick}>
        <img src={imageSrc} alt="Interactive Engineering" className="clickable-image" />
        {textboxes.map((textbox, index) => (
          <div
            key={index}
            className="textbox"
            style={{
              position: 'absolute',
              top: `${textbox.y}px`,
              left: `${textbox.x}px`,
            }}
            onClick={handleTextboxClick} // Prevent propagation
          >
            <textarea placeholder="Type here..."></textarea>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ClickableImage;