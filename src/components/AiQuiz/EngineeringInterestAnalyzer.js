import React, { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs";
import * as use from "@tensorflow-models/universal-sentence-encoder";
import { kmeans } from "ml-kmeans";

const EngineeringInterestAnalyzer = ({ userInputs }) => {
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

    // Convert user inputs into embeddings
    const getEmbeddings = async () => {
        setIsLoading(true);

        if (!model) {
            console.error("⚠️ Model not loaded yet!");
            return;
        }

        if (userInputs.length === 0) {
            console.error("⚠️ No user inputs provided!");
            setIsLoading(false);
            return;
        }

        const embeddingsTensor = await model.embed(userInputs);
        const embeddingsArray = embeddingsTensor.arraySync();
        setEmbeddings(embeddingsArray);
        console.log("✅ Embeddings generated:", embeddingsArray);

        setIsLoading(false);
    };

    // Cluster Engineering Interests using k-means
    const clusterInterests = () => {
        if (!embeddings.length) {
            console.error("⚠️ No embeddings found. Click 'Analyze Interests' first!");
            return;
        }

        const numClusters = 4; // Define number of clusters

        try {
            console.log("🔄 Running K-Means Clustering...");

            const result = kmeans(embeddings, numClusters);
            setClusters(result.clusters);
            console.log("✅ Clustering complete! Results:", result.clusters);

            // After clustering, calculate and display the top 3 fields
            displayTopFields();
        } catch (error) {
            console.error("❌ Error during clustering:", error);
        }
    };

    // Calculate and display the top 3 most common fields
    const displayTopFields = () => {
        const fieldCount = {};

        userInputs.forEach((field) => {
            fieldCount[field] = (fieldCount[field] || 0) + 1;
        });

        const sortedFields = Object.entries(fieldCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3);

        setTopFields(sortedFields);
    };

    return (
        <div>
            <h2>🚀 Engineering Interest Analyzer</h2>
            
            {/* Analyze Interests Button */}
            <button onClick={getEmbeddings} disabled={isLoading}>
                {isLoading ? "Loading..." : "Analyze Interests"}
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