import React, { useState } from "react";
import EngineeringInterestAnalyzer from "./EngineeringInterestAnalyzer"; // Import NLP Model Component
import One from "../images/QuizImages/1.jpeg";
import Two from "../images/QuizImages/2.jpg";
import Three from "../images/QuizImages/3.jpg";
import Four from "../images/QuizImages/4.jpg";
import Five from "../images/QuizImages/5.jpg";
import Six from "../images/QuizImages/6.jpeg";
import Seven from "../images/QuizImages/7.jpg";
import Eight from "../images/QuizImages/8.jpg";

const quizData = [
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: One },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Two },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Three },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Four },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Five },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Six },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Seven },
    { question: "WWhich fields of engineering in this image inspire or interest you the most?", image: Eight },
];

const EngineeringQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userInputs, setUserInputs] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [finalUserInputs, setFinalUserInputs] = useState([]);

    // Handle image click to place multiple input boxes
    const handleImageClick = (event) => {
        const imgRect = event.target.getBoundingClientRect();
        const x = event.clientX - imgRect.left;
        const y = event.clientY - imgRect.top;

        // Ensure there's a list of inputs for the current question
        const updatedInputs = { ...userInputs };
        if (!updatedInputs[currentQuestion]) {
            updatedInputs[currentQuestion] = [];
        }

        // Add a new input field at the clicked position
        updatedInputs[currentQuestion].push({ x, y, text: "" });
        setUserInputs(updatedInputs);
    };

    // Handle text input change
    const handleInputChange = (index, event) => {
        const updatedInputs = { ...userInputs };
        updatedInputs[currentQuestion][index].text = event.target.value;
        setUserInputs(updatedInputs);
    };

    // Clear all inputs for the current question
    const clearCurrentAnswers = () => {
        const updatedInputs = { ...userInputs };
        delete updatedInputs[currentQuestion]; // Remove all answers for the current question
        setUserInputs(updatedInputs);
    };

    // Navigate to previous question
    const prevQuestion = () => setCurrentQuestion((prev) => Math.max(0, prev - 1));

    // Navigate to next question
    const nextQuestion = () => setCurrentQuestion((prev) => Math.min(quizData.length - 1, prev + 1));

    // Submit quiz and show results
    const submitQuiz = () => {
        // Flatten all inputs into a single list and remove empty answers
        const allUserAnswers = Object.values(userInputs)
            .flat()
            .map(input => input.text.trim()) // Extract text and remove spaces
            .filter(text => text !== ""); // Remove empty answers

        setFinalUserInputs(allUserAnswers);
        setShowResults(true);
    };

    return (
        <div>
            {!showResults ? (
                <>
                    <h2>📝 Engineering Interest Quiz</h2>
                    <h3>{quizData[currentQuestion].question}</h3>

                    {/* Clickable Image */}
                    <div style={{ position: "relative", display: "inline-block" }}>
                        <img
                            src={quizData[currentQuestion].image}
                            alt="Engineering Field"
                            style={{ width: "100%", maxHeight: "400px", objectFit: "cover", borderRadius: "8px", cursor: "pointer" }}
                            onClick={handleImageClick}
                        />

                        {/* Render Multiple Inputs on the Image */}
                        {userInputs[currentQuestion] &&
                            userInputs[currentQuestion].map((input, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Describe this area..."
                                    value={input.text}
                                    onChange={(event) => handleInputChange(index, event)}
                                    style={{
                                        position: "absolute",
                                        left: input.x,
                                        top: input.y,
                                        width: "150px",
                                        padding: "5px",
                                        borderRadius: "5px",
                                        border: "1px solid black",
                                        background: "white",
                                        zIndex: 10,
                                    }}
                                />
                            ))}
                    </div>

                    {/* Buttons */}
                    <div style={{ marginTop: "20px" }}>
                        <button onClick={prevQuestion} disabled={currentQuestion === 0}>
                            ◀️ Previous
                        </button>

                        {/* Remove All Answers Button */}
                        {userInputs[currentQuestion] && userInputs[currentQuestion].length > 0 && (
                            <button onClick={clearCurrentAnswers} style={{ margin: "0 10px", background: "red", color: "white" }}>
                                🗑️ Remove All Answers
                            </button>
                        )}

                        {currentQuestion < quizData.length - 1 ? (
                            <button onClick={nextQuestion}>Next ▶️</button>
                        ) : (
                            <button onClick={submitQuiz}>Submit</button>
                        )}
                    </div>
                </>
            ) : (
                <div>
                    <h2>📊 Quiz Results</h2>
                    <h3>Your Engineering Field Descriptions:</h3>
                    <ul>
                        {Object.entries(userInputs).map(([questionIndex, inputs]) => (
                            <li key={questionIndex}>
                                <strong>Q{parseInt(questionIndex) + 1}:</strong>
                                <ul>
                                    {inputs.map((input, i) => (
                                        <li key={i}>{input.text}</li>
                                    ))}
                                </ul>
                            </li>
                        ))}
                    </ul>

                    {/* Pass results to NLP Model for further analysis */}
                    <EngineeringInterestAnalyzer userInputs={finalUserInputs} />
                </div>
            )}
        </div>
    );
};

export default EngineeringQuiz;