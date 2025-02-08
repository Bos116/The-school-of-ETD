import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png"; // Replace with your logo file path

function Navbar({ isAuth, signUserOut }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const styles = {
    navbar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "#ffffff",
      padding: "1px 20px",
      maxWidth: "100%",
      flexWrap: "wrap",
      boxSizing: "border-box",
      position: "relative",
    },
    logoContainer: {
      display: "flex",
      alignItems: "center",
    },
    logo: {
      width: "200px",
      height: "auto",
    },
    navLinks: {
      display: isMobile ? "none" : "flex",
      gap: "15px",
    },
    mobileMenu: {
      display: menuOpen ? "flex" : "none",
      flexDirection: "column",
      position: "absolute",
      top: "100%", // Ensures menu appears below navbar
      right: "0",
      backgroundColor: "#ffffff",
      boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
      width: "200px",
      padding: "10px",
      borderRadius: "5px",
      zIndex: 1000,
    },
    link: {
      textDecoration: "none",
      color: "#000000",
      fontSize: "16px",
      fontWeight: "bold",
      padding: "10px 0",
      display: "block",
    },
    commonButton: {
      display: "inline-block",
      textAlign: "center",
      backgroundColor: "#007BFF", // Blue for login
      color: "#fff",
      border: "none",
      borderRadius: "5px",
      padding: "5px 10px",
      cursor: "pointer",
      fontSize: "16px",
      textDecoration: "none", // Ensure text looks like a button
      marginTop: "10px",
    },
    logoutButton: {
      backgroundColor: "#ff4d4d", // Red for logout
    },
    burgerMenu: {
      display: isMobile ? "flex" : "none",
      flexDirection: "column",
      cursor: "pointer",
      padding: "10px",
    },
    bar: {
      width: "25px",
      height: "3px",
      backgroundColor: "#000",
      margin: "4px 0",
    },
  };

  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <div style={styles.logoContainer}>
        <img src={logo} alt="Logo" style={styles.logo} />
      </div>

      {/* Burger Menu Button */}
      <div style={styles.burgerMenu} onClick={toggleMenu}>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
        <div style={styles.bar}></div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobile && (
        <div style={styles.mobileMenu}>
          <Link to="/" style={styles.link} onClick={closeMenu}>
            Home
          </Link>
          <Link to="/quiz" style={styles.link} onClick={closeMenu}>
            Quiz
          </Link>
          <Link to="/contact" style={styles.link} onClick={closeMenu}>
            Contact-Us
          </Link>
          {!isAuth ? (
            <Link to="/login" style={{ ...styles.commonButton }} onClick={closeMenu}>
              Login
            </Link>
          ) : (
            <>
              <Link to="/blog" style={styles.link} onClick={closeMenu}>
                Blog
              </Link>
              <button
                onClick={() => {
                  signUserOut();
                  closeMenu();
                }}
                style={{ ...styles.commonButton, ...styles.logoutButton }}
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}

      {/* Desktop Navigation */}
      <div style={{ ...styles.navLinks, display: isMobile ? "none" : "flex" }}>
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
          <Link to="/login" style={{ ...styles.commonButton }}>
            Login
          </Link>
        ) : (
          <>
            <Link to="/blog" style={styles.link}>
              Blog
            </Link>
            <button onClick={signUserOut} style={{ ...styles.commonButton, ...styles.logoutButton }}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;