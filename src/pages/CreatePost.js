import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { useNavigate } from "react-router";

const CreatePost = ({ isAuth }) => {
  const [title, setTitle] = useState("");
  const [postText, setPostText] = useState("");
  const [category, setCategory] = useState("");
  const postCollectionRef = collection(db, "posts");
  let navigate = useNavigate();

  const CreatePost = async () => {
    await addDoc(postCollectionRef, {
      title,
      postText,
      category,
      Author: {
        name: auth.currentUser.displayName,
        Id: auth.currentUser.uid,
      },
    });
    navigate("/");
  };

  const styles = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f4f4f4",
      padding: "20px",
    },
    card: {
      backgroundColor: "#fff",
      padding: "30px",
      borderRadius: "12px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      maxWidth: "500px",
      width: "100%",
      textAlign: "center",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "20px",
      color: "#333",
    },
    inputGroup: {
      display: "flex",
      flexDirection: "column",
      textAlign: "left",
      marginBottom: "15px",
    },
    label: {
      fontSize: "14px",
      fontWeight: "600",
      marginBottom: "5px",
      color: "#555",
    },
    input: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      transition: "all 0.3s ease-in-out",
    },
    textarea: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      height: "100px",
      resize: "none",
      transition: "all 0.3s ease-in-out",
    },
    select: {
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "6px",
      fontSize: "16px",
      backgroundColor: "#fff",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
    },
    button: {
      background: "linear-gradient(45deg, #007BFF, #00D4FF)",
      color: "#fff",
      fontSize: "16px",
      padding: "12px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      transition: "all 0.3s ease-in-out",
      marginTop: "10px",
      width: "100%",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>📝 Create a Post</h1>

        {/* Title Input */}
        <div style={styles.inputGroup}>
          <label htmlFor="title" style={styles.label}>Title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter post title..."
            style={styles.input}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>

        {/* Category Dropdown */}
        <div style={styles.inputGroup}>
          <label htmlFor="category" style={styles.label}>Category:</label>
          <select
            id="category"
            style={styles.select}
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="">Select a Category</option>
            <option value="Technology">Technology</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Post Text Input */}
        <div style={styles.inputGroup}>
          <label htmlFor="postText" style={styles.label}>Post:</label>
          <textarea
            id="postText"
            placeholder="Write your post here..."
            style={styles.textarea}
            onChange={(event) => setPostText(event.target.value)}
          />
        </div>

        {/* Submit Button */}
        <button style={styles.button} onClick={CreatePost}>
          🚀 Submit Post
        </button>
      </div>
    </div>
  );
};

export default CreatePost;