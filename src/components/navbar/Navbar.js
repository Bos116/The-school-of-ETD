import React from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.svg"; // Replace with your logo file path

function Navbar({ isAuth, signUserOut }) {
  const styles = {
    navbar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#333",
        padding: "10px 20px",
        color: "#fff",
        maxWidth: "100%", // Prevent overflow
        flexWrap: "wrap", // Wrap content if necessary
        boxSizing: "border-box", // Includes padding i
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    logo: {
      width: "50px", // Adjust to your logo size
      height: "auto",
    },
    navLinks: {
      display: "flex",
      gap: "15px",
    },
    link: {
      textDecoration: "none",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "bold",
    },
    logoutButton: {
      backgroundColor: "#ff4d4d",
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
      fontSize: "16px",
    },
    loginButton: {
      backgroundColor: "#007BFF", // Blue background
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
      fontSize: "16px",
    },
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.link}>
          Home
        </Link>
        <Link to="/quiz" style={styles.link}>
          Quiz
        </Link>
       
        <Link to="/contact" style={styles.link}>
          Contact-Us
        </Link>
        {!isAuth ? (
          <Link to="/login" style={styles.loginButton}>
            Login
          </Link>
        ) : (
          <> 
            <Link to="/blog" style={styles.link}>
              Blog
            </Link>
            <button onClick={signUserOut} style={styles.logoutButton}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;