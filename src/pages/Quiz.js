import React from 'react';
import logo from '../components/images/logo.svg'; // Adjust the path if necessary
import ClickableImage from '../components/quiz/ClickableImage'; // Import the ClickableImage component
import '../App.css'; // Import the CSS file

const Quiz = () => {
  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz</h1>
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
        <button className="quiz-button">Next Question</button>
        <button className="quiz-button">Hint</button>
        <button className="quiz-button">Previous Question</button>
      </div>
    </div>
  );
};

export default Quiz;