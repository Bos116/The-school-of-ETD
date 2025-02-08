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
import SideBox from "../SideBox";

const quizData = [
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: One },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Two },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Three },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Four },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Five },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Six },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Seven },
    { question: "Which fields of engineering in this image inspire or interest you the most?", image: Eight },
];

const EngineeringQuiz = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userInputs, setUserInputs] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [finalUserInputs, setFinalUserInputs] = useState([]);
    const [embeddings, setEmbeddings] = useState([]);

    // Handle image click to place multiple input boxes
    const handleImageClick = (event) => {
        const imgRect = event.target.getBoundingClientRect();
        const x = event.clientX - imgRect.left;
        const y = event.clientY - imgRect.top;

        const updatedInputs = { ...userInputs };
        if (!updatedInputs[currentQuestion]) {
            updatedInputs[currentQuestion] = [];
        }

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
        delete updatedInputs[currentQuestion];
        setUserInputs(updatedInputs);
    };

    // Navigation functions
    const prevQuestion = () => setCurrentQuestion((prev) => Math.max(0, prev - 1));
    const nextQuestion = () => setCurrentQuestion((prev) => Math.min(quizData.length - 1, prev + 1));

    const submitQuiz = () => {
        const allUserAnswers = Object.values(userInputs)
            .flat()
            .map(input => input.text.trim())
            .filter(text => text !== "");
    
        setFinalUserInputs(allUserAnswers);
        setShowResults(true);
    };

    return (

        <div style={styles.quizContainer}>
            {!showResults ? (
                <>
                    <h2 style={styles.header}>📝 Engineering Interest Quiz</h2>
                    <h3 style={styles.questionText}>{quizData[currentQuestion].question}</h3>

                    {/* Clickable Image */}
                    <div style={styles.imageContainer}>
                        <img
                            src={quizData[currentQuestion].image}
                            alt="Engineering Field"
                            style={styles.image}
                            onClick={handleImageClick}
                        />

                        {/* Render Multiple Inputs on the Image */}
                        {userInputs[currentQuestion] &&
                            userInputs[currentQuestion].map((input, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    placeholder="Engineering feild that intrests you..."
                                    value={input.text}
                                    onChange={(event) => handleInputChange(index, event)}
                                    style={{
                                        ...styles.inputBox,
                                        left: input.x,
                                        top: input.y,
                                    }}
                                />
                            ))}
                    </div>
                    
                    {/* Buttons */}
                    <div style={styles.buttonContainer}>
                        <button onClick={prevQuestion} disabled={currentQuestion === 0} style={styles.navButton}>
                            ◀️ Previous
                        </button>

                        {userInputs[currentQuestion] && userInputs[currentQuestion].length > 0 && (
                            <button onClick={clearCurrentAnswers} style={styles.clearButton}>
                                🗑️ Remove All Answers
                            </button>
                        )}

                        {currentQuestion < quizData.length - 1 ? (
                            <button onClick={nextQuestion} style={styles.navButton}>Next ▶️</button>
                        ) : (
                            <button onClick={submitQuiz} style={styles.submitButton}>Submit</button>
                        )}
                        
                    </div>
                </>
            ) : (
                <div style={styles.resultsContainer}>
                    <h2 style={styles.header}>📊 Quiz Results</h2>
                    <h3 style={styles.resultText}>Your Engineering Field Descriptions:</h3>
                    <ul>
                        {Object.entries(userInputs).map(([questionIndex, inputs]) => (
                            <li key={questionIndex} style={styles.resultItem}>
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

// Inline Styles
const styles = {
    quizContainer: {
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        backgroundColor: "#f4f4f4",
        borderRadius: "10px",
        maxWidth: "800px",
        margin: "auto",
        boxShadow: "0px 4px 8px rgba(0,0,0,0.1)"
    },
    header: {
        color: "#333",
        fontSize: "24px",
        marginBottom: "10px"
    },
    questionText: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#444"
    },
    imageContainer: {
        position: "relative",
        display: "inline-block",
        marginTop: "10px"
    },
    image: {
        width: "100%",
        maxHeight: "400px",
        objectFit: "cover",
        borderRadius: "8px",
        cursor: "pointer",
        border: "3px solid #ddd"
    },
    inputBox: {
        position: "absolute",
        width: "150px",
        padding: "5px",
        borderRadius: "5px",
        border: "1px solid black",
        background: "white",
        zIndex: 10,
        fontSize: "14px"
    },
    buttonContainer: {
        marginTop: "20px",
        display: "flex",
        justifyContent: "center",
        gap: "10px"
    },
    navButton: {
        padding: "8px 15px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#007BFF",
        color: "white",
        cursor: "pointer",
    },
    clearButton: {
        padding: "8px 15px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#FF4D4D",
        color: "white",
        cursor: "pointer"
    },
    submitButton: {
        padding: "8px 20px",
        fontSize: "16px",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#28A745",
        color: "white",
        cursor: "pointer"
    },
    resultsContainer: {
        textAlign: "left",
        marginTop: "20px",
        padding: "20px"
    },
    resultText: {
        fontSize: "18px",
        fontWeight: "bold",
        color: "#222"
    },
    resultItem: {
        marginBottom: "10px"
    }
};

export default EngineeringQuiz;