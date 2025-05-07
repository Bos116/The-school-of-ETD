import React from "react";
import { Link } from "react-router-dom";
import { auth, db } from "../../firebase-config";
import { doc, deleteDoc } from "firebase/firestore";

function Post({ post, isAuth, onDelete }) {
  const deletePost = async () => {
    const postDoc = doc(db, "posts", post.id);
    await deleteDoc(postDoc);
    onDelete(post.id);
  };

  const styles = {
    card: {
      backgroundColor: "#fff",
      border: "1px solid #ddd",
      borderRadius: "12px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
    },
    title: {
      fontSize: "1.5rem",
      fontWeight: "600",
      margin: 0,
    },
    text: {
      fontSize: "1rem",
      margin: "15px 0",
      lineHeight: "1.6",
    },
    author: {
      fontStyle: "italic",
      color: "#555",
      marginBottom: "15px",
    },
    deleteButton: {
      backgroundColor: "#dc3545",
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      padding: "8px 12px",
      fontSize: "0.9rem",
      cursor: "pointer",
    },
    commentButton: {
      backgroundColor: "#007bff",
      color: "#fff",
      border: "none",
      padding: "10px 16px",
      borderRadius: "8px",
      fontSize: "0.95rem",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <h2 style={styles.title}>{post.title}</h2>
        {isAuth && post.Author?.Id === auth.currentUser?.uid && (
          <button style={styles.deleteButton} onClick={deletePost}>
            Delete
          </button>
        )}
      </div>
      <p style={styles.text}>{post.postText}</p>
      <p style={styles.author}>@{post.Author?.name || "Unknown Author"}</p>
      <Link to={`/comment/${post.id}`}>
        <button style={styles.commentButton}>View Comments</button>
      </Link>
    </div>
  );
}

export default Post;