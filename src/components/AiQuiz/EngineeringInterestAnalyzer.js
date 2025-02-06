import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { kmeans } from "ml-kmeans";

const EngineeringInterestAnalyzer = () => {
    const [userInputs, setUserInputs] = useState([
        "Aerospace engineering.",
        "Aerospace engineering.",
        "Aerospace engineering.",
        "Material engineering.",
        "Material engineering.",
        "Mechanical engineering.",
        "Surface engineering.",
        "Industrial engineering.",
        "Civil engineering.",
        "Electrical engineering.",
        "Chemical engineering.",
        "Environmental engineering.",
        "Software engineering.",
        "Biomedical engineering.",
        "Nuclear engineering.",
        "Automotive engineering.",
        "Petroleum engineering.",
        "Agricultural engineering.",
        "Marine engineering.",
        "Mining engineering.",
        "Structural engineering.",
        "Robotics engineering.",
        "Telecommunications engineering.",
    ]);

    const [model, setModel] = useState(null);
    const [embeddings, setEmbeddings] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [topFields, setTopFields] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load the Universal Sentence Encoder Model
    useEffect(() => {
        const loadModel = async () => {
            const loadedModel = await use.load();
            setModel(loadedModel);
            console.log("✅ Model loaded successfully!");
        };
        loadModel();
    }, []);

    // Convert text inputs into embeddings
    const getEmbeddings = async () => {
        setIsLoading(true); // Set loading state to true when embeddings are being generated

        if (!model) {
            console.error("⚠️ Model not loaded yet!");
            return;
        }

        const embeddingsTensor = await model.embed(userInputs);
        const embeddingsArray = embeddingsTensor.arraySync();
        setEmbeddings(embeddingsArray);
        console.log("✅ Embeddings generated:", embeddingsArray);

        setIsLoading(false); // Set loading state to false once embeddings are ready
    };

    // Cluster Engineering Interests using fixed centroids
    const clusterInterests = () => {
        if (!embeddings.length) {
            console.error("⚠️ No embeddings found. Click 'Analyze Interests' first!");
            return;
        }

        const numClusters = 5; // Set number of clusters

        // Choose first few embeddings as fixed initial centroids
        const fixedInitialCentroids = embeddings.slice(0, numClusters);

        try {
            console.log("🔄 Running K-Means Clustering...");

            // Use fixed initial centroids
            const result = kmeans(embeddings, numClusters, { initialization: fixedInitialCentroids });

            setClusters(result.clusters);
            console.log("✅ Clustering complete! Results:", result.clusters);

            // After clustering, calculate and display the top 3 fields
            displayTopFields();
        } catch (error) {
            console.error("❌ Error during clustering:", error);
        }
    };

    // Function to calculate and display the top 3 most common fields
    const displayTopFields = () => {
        const fieldCount = {};

        // Count occurrences of each input
        userInputs.forEach((field) => {
            fieldCount[field] = (fieldCount[field] || 0) + 1;
        });

        // Sort the fields by the number of occurrences (descending order)
        const sortedFields = Object.entries(fieldCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3); // Get the top 3 fields

        // Set the top fields to display
        setTopFields(sortedFields);
    };

    return (
        <div>
            <h2>🚀 Engineering Interest Analyzer</h2>
            
            {/* Analyze Interests Button */}
            <button onClick={getEmbeddings} disabled={isLoading}>
                {isLoading ? (
                    <span>Loading...</span> // Loading text while fetching
                ) : (
                    "Analyze Interests"
                )}
            </button>
            
            {/* Find Patterns Button */}
            <button onClick={clusterInterests}>Find Patterns</button>

            {/* Show cluster results */}
            {clusters.length > 0 && (
                <div>
                    <h3>🧩 Cluster Results:</h3>
                    <ul>
                        {userInputs.map((interest, index) => (
                            <li key={index}>
                                {interest} → Cluster {clusters[index]}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Display Top 3 Selected Engineering Fields */}
            {topFields.length > 0 && (
                <div>
                    <h3>Top 3 Selected Engineering Fields:</h3>
                    <ul>
                        {topFields.map(([field, count], index) => (
                            <li key={index}>
                                {field} → Selected {count} times
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default EngineeringInterestAnalyzer;