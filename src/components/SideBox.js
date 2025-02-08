import React from "react";

const SideBox = ({ position, title, content }) => {
    return (
        <div style={{ ...styles.sideBox, ...(position === "left" ? styles.left : styles.right) }}>
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.content}>{content}</p>
        </div>
    );
};

// Inline styles
const styles = {
    sideBox: {
        position: "fixed",
        top: "50%",
        transform: "translateY(-50%)",
        width: "25%",
        padding: "15px",
        backgroundColor: "#fff",
        border: "2px solid #ddd",
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        fontSize: "14px",
        textAlign: "center",
        zIndex: 1000,
        display: "none", // Default hidden, will be shown on larger screens
    },
    left: {
        left: "10px",
        display: "block",
    },
    right: {
        right: "10px",
        display: "block",
    },
    title: {
        fontSize: "16px",
        fontWeight: "bold",
        marginBottom: "10px",
        color: "#333",
    },
    content: {
        color: "#555",
    },
};

export default SideBox;