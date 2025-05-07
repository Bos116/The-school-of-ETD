import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";

// Engineering fields (Main Categories)
const engineeringFields = [
  "Mechanical Engineering", "Electrical Engineering", "Civil Engineering",
  "Software Engineering", "Chemical Engineering", "Industrial Engineering",
  "Biomedical Engineering", "Aerospace Engineering", "Environmental Engineering",
  "Agricultural Engineering", "Mining Engineering", "Naval Engineering",
  "Nuclear Engineering", "Petroleum Engineering"
];

const EngineeringInterestAnalyzer = ({ userInputs }) => {
  const [model, setModel] = useState(null);
  const [fieldEmbeddings, setFieldEmbeddings] = useState([]);
  const [topFields, setTopFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Load AI Model and Engineering Field Embeddings
  useEffect(() => {
    const loadModel = async () => {
      try {
        const loadedModel = await use.load();
        setModel(loadedModel);
        console.log("AI Model Loaded Successfully");

        const fieldEmbeddingsTensor = await loadedModel.embed(engineeringFields);
        const fieldEmbeddingsArray = await fieldEmbeddingsTensor.array();  
        setFieldEmbeddings(fieldEmbeddingsArray);
      } catch (error) {
        setErrorMessage("Failed to load AI model.");
      }
    };
    loadModel();
  }, []);

  // Function to calculate Cosine Similarity between two vectors
  const cosineSimilarity = (vecA, vecB) => {
    if (!vecA || !vecB || vecA.length !== vecB.length) {
      console.warn("Skipping similarity computation due to mismatched vectors.");
      return 0;
    }
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a ** 2, 0));
    const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b ** 2, 0));
    return dotProduct / (magnitudeA * magnitudeB);
  };

  // Analyze Interests when `userInputs` change
  useEffect(() => {
    const analyzeInterests = async () => {
      setIsLoading(true);
      setTopFields([]);
      setErrorMessage("");

      if (userInputs.length === 0) {
        setIsLoading(false);
        setErrorMessage("No interests provided!");
        return;
      }

      try {
        const userEmbeddingsTensor = await model.embed(userInputs);
        const userEmbeddings = await userEmbeddingsTensor.array();  // Correct async handling

        const fieldScores = {};

        userInputs.forEach((interest, i) => {
          let bestMatch = "";
          let highestScore = -1;

          engineeringFields.forEach((field, j) => {
            if (!userEmbeddings[i] || !fieldEmbeddings[j]) return;

            const similarity = cosineSimilarity(userEmbeddings[i], fieldEmbeddings[j]);

            if (similarity > highestScore) {
              highestScore = similarity;
              bestMatch = field;
            }
          });

          if (bestMatch) {
            fieldScores[bestMatch] = (fieldScores[bestMatch] || 0) + 1;
          }
        });

        const sortedFields = Object.entries(fieldScores)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3);

        setTopFields(sortedFields);
      } catch (error) {
        console.error("Processing error:", error);
      }

      setIsLoading(false);
    };

    analyzeInterests();
  }, [userInputs, model, fieldEmbeddings]);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#2E3A59" }}>AI Engineering Interest Analyzer</h2>
      <h3 style={{ color: "#2E3A59"}}>Wait a moment your intrests are being analysed...</h3>

      {isLoading && <p>Analyzing...</p>}
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

      {topFields.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Top 3 Matched Engineering Fields:</h3>
          <ul>
            {topFields.map(([field, count], index) => (
              <li key={index}>
                <strong>{field}</strong> → Matched {count} {count === 1 ? "time" : "times"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EngineeringInterestAnalyzer;