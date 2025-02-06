import React from 'react';
import logo from '../components/images/logo.svg'; // Adjust the path if necessary
import ClickableImage from '../components/quiz/ClickableImage'; // Import the ClickableImage component
import '../App.css'; // Import the CSS file
import DynamicButton from '../components/DynamicButton';

const Quiz = () => {
  return (
    <div className="quiz-container">
      <ClickableImage 
        className="quiz-image"
        src={logo} 
        alt="Quiz Logo" 
      />
      <div>
        <p>
          Explore the image and click on an engineering field that sparks your curiosity and excitement!
        </p>
      </div>

      <div className="quiz-ap">
        <DynamicButton className="quiz-button" variant='danger' label="Previous Question"></DynamicButton>
        <DynamicButton className="quiz-button" variant='info' label="Hint"></DynamicButton>
        <DynamicButton className="quiz-button" variant='primary' label="Next Question"></DynamicButton>
      </div>
    </div>
  );
};

export default Quiz;