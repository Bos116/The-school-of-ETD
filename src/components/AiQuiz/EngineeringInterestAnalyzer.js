import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { kmeans } from "ml-kmeans";

// Define a mapping for fields and their subfields
const fieldMapping = {
  "Mechanical Engineering": [
    "Aerospace",
    "Automotive",
    "Robotics",
    "Materials Science",
    "Thermal Engineering",
    "Manufacturing",
    "Mechatronics",
    "Biomechanics",
    "Energy Systems",
    "HVAC",
    "Mechanics"
  ],
  "Electrical Engineering": [
    "Power Systems",
    "Telecommunications",
    "Control Systems",
    "Signal Processing",
    "Electronics",
    "Embedded Systems",
    "Optical Engineering",
    "Microelectronics",
    "Instrumentation",
  ],
  "Civil Engineering": [
    "Structural",
    "Environmental",
    "Transportation",
    "Geotechnical",
    "Water Resources",
    "Construction Management",
    "Urban Planning",
    "Coastal Engineering",
    "Surveying",
  ],
  "Software Engineering": [
    "Web Development",
    "Data Science",
    "Artificial Intelligence",
    "Mobile App Development",
    "Backend Development",
    "Frontend Development",
    "Cloud Computing",
    "Machine Learning",
    "DevOps",
    "Cybersecurity",
    "Blockchain",
  ],
  "Chemical Engineering": [
    "Process Engineering",
    "Biochemical Engineering",
    "Materials Engineering",
    "Nanotechnology",
    "Pharmaceutical Engineering",
    "Environmental Engineering",
    "Food Engineering",
    "Petroleum Engineering",
  ],
  "Industrial Engineering": [
    "Operations Research",
    "Supply Chain Management",
    "Logistics",
    "Manufacturing Systems",
    "Ergonomics",
    "Quality Control",
    "Systems Engineering",
    "Production Planning",
    "Automation",
  ],
  "Biomedical Engineering": [
    "Medical Devices",
    "Bioinformatics",
    "Biomechanics",
    "Biomaterials",
    "Tissue Engineering",
    "Medical Imaging",
    "Clinical Engineering",
    "Rehabilitation Engineering",
  ],
  "Aerospace Engineering": [
    "Flight Engineering",
    "Rocketry",
    "Space Systems Engineering",
    "Aerodynamics",
    "Propulsion",
    "Satellite Engineering",
    "Avionics",
    "Aircraft Maintenance",
  ],
  "Environmental Engineering": [
    "Water Treatment",
    "Air Pollution Control",
    "Waste Management",
    "Renewable Energy",
    "Sustainable Development",
    "Environmental Health",
    "Environmental Impact Assessment",
    "Climate Change",
  ],
  "Agricultural Engineering": [
    "Farm Equipment Engineering",
    "Irrigation Engineering",
    "Soil Engineering",
    "Food Processing",
    "Hydrology",
    "Precision Agriculture",
    "Agricultural Robotics",
  ],
  "Mining Engineering": [
    "Mine Safety",
    "Geology",
    "Mineral Processing",
    "Mining Equipment",
    "Environmental Mining",
    "Explosives Engineering",
  ],
  "Naval Engineering": [
    "Ship Design",
    "Naval Architecture",
    "Marine Engineering",
    "Shipbuilding",
    "Offshore Engineering",
  ],
  "Nuclear Engineering": [
    "Nuclear Power",
    "Radiation Protection",
    "Reactor Design",
    "Fusion Energy",
    "Nuclear Waste Management",
  ],
  "Petroleum Engineering": [
    "Oil and Gas Exploration",
    "Reservoir Engineering",
    "Drilling Engineering",
    "Production Engineering",
    "Offshore Oil",
    "Geophysical Engineering",
  ],
};

// Normalize input by converting to lowercase
const normalizeInput = (input) => input.trim().toLowerCase();

// Normalize fieldMapping by converting all keys and subfields to lowercase
const normalizeFieldMapping = (fieldMapping) => {
  const normalizedMapping = {};
  Object.keys(fieldMapping).forEach((field) => {
    normalizedMapping[field.toLowerCase()] = fieldMapping[field].map((subfield) =>
      subfield.toLowerCase()
    );
  });
  return normalizedMapping;
};

const EngineeringInterestAnalyzer = ({ userInputs }) => {
  const [model, setModel] = useState(null);
  const [embeddings, setEmbeddings] = useState([]);
  const [topFields, setTopFields] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Load the Universal Sentence Encoder Model
  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await use.load();
      setModel(loadedModel);
      console.log("✅ Model loaded successfully!");
    };
    loadModel();
  }, []);

  // Convert user inputs into embeddings
  const getEmbeddings = async () => {
    setIsLoading(true);
    setErrorMessage('');

    if (!model) {
      setErrorMessage("⚠️ Model not loaded yet!");
      setIsLoading(false);
      return;
    }

    if (userInputs.length === 0) {
      setErrorMessage("⚠️ No user inputs provided! Please provide some fields of interest.");
      setIsLoading(false);
      return;
    }

    try {
      const embeddingsTensor = await model.embed(userInputs);
      const embeddingsArray = embeddingsTensor.arraySync();
      setEmbeddings(embeddingsArray);
      console.log("✅ Embeddings generated:", embeddingsArray);
      setIsLoading(false);
    } catch (error) {
      setErrorMessage("❌ Error generating embeddings.");
      setIsLoading(false);
    }
  };

  // Cluster Engineering Interests using k-means
  const clusterInterests = () => {
    if (!embeddings.length) {
      setErrorMessage("⚠️ Please analyze interests first to generate embeddings.");
      return;
    }

    const numClusters = 3; // Define number of clusters
    try {
      console.log("🔄 Running K-Means Clustering...");
      const result = kmeans(embeddings, numClusters);
      // Filter out empty clusters
      const filteredClusters = result.clusters.filter((cluster, index) => {
        return userInputs.filter((interest, idx) => result.clusters[idx] === index).length > 0;
      });

      // Log the clusters to the console
      console.log("✅ Clustering complete! Results:", filteredClusters);

      // Display the top 3 fields
      displayTopFields();
    } catch (error) {
      setErrorMessage("❌ Error during clustering.");
    }
  };

  // Calculate and display the top 3 most common fields
  const displayTopFields = () => {
    const fieldCount = {};

    userInputs.forEach((field) => {
      const broaderField = findBroaderField(field);
      fieldCount[broaderField] = (fieldCount[broaderField] || 0) + 1;
    });

    const sortedFields = Object.entries(fieldCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 3);

    setTopFields(sortedFields);
  };

  // Map each input to a broader engineering field (subfields → main field)
  const findBroaderField = (input) => {
    const normalizedInput = normalizeInput(input);
    const normalizedMapping = normalizeFieldMapping(fieldMapping);

    for (let field in normalizedMapping) {
      if (normalizedMapping[field].includes(normalizedInput)) {
        return field;
      }
    }
    return input;
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#2E3A59" }}>🚀 Engineering Interest Analyzer</h2>
      <p style={{ fontSize: "16px", color: "#555" }}>
        Enter your fields of interest below, then analyze and find patterns based on your inputs.
      </p>

      {/* User Inputs */}
      <textarea
        style={{ width: "100%", padding: "10px", fontSize: "16px", borderRadius: "5px", borderColor: "#ddd", marginBottom: "15px" }}
        placeholder="Enter your fields of interest, separated by commas (e.g. Robotics, Power Systems, Data Science)"
        value={userInputs.join(", ")}
        onChange={(e) => userInputs = e.target.value.split(",").map(input => input.trim())}
      />

      {/* Analyze Interests Button */}
      <button
        style={{
          backgroundColor: "#4CAF50", color: "#fff", border: "none", padding: "10px 20px", fontSize: "16px", cursor: "pointer", borderRadius: "5px",
          marginRight: "10px"
        }}
        onClick={getEmbeddings}
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Analyze Interests"}
      </button>

      {/* Find Patterns Button */}
      <button
        style={{
          backgroundColor: "#2196F3", color: "#fff", border: "none", padding: "10px 20px", fontSize: "16px", cursor: "pointer", borderRadius: "5px",
        }}
        onClick={clusterInterests}
      >
        Find Patterns
      </button>

      {/* Error Message */}
      {errorMessage && <div style={{ color: "red", marginTop: "15px" }}>{errorMessage}</div>}

      {/* Display Top 3 Selected Engineering Fields */}
      {topFields.length > 0 && (
        <div style={{ marginTop: "30px" }}>
          <h3>Top 3 Selected Engineering Fields:</h3>
          <ul style={{ fontSize: "16px" }}>
            {topFields.map(([field, count], index) => (
              <li key={index} style={{ marginBottom: "10px", color: "#333" }}>
                <strong>{field}</strong> → Selected {count} {count === 1 ? "time" : "times"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EngineeringInterestAnalyzer;