import React from "react";
import Logo from "../images/footer-logo-white.png"

const Footer = () => {
  const footerStyle = {
    backgroundColor: "#1f2937", // bg-gray-900
    color: "#ffffff",
    padding: "40px 24px",
    marginTop: "40px",
  };

  const containerStyle = {
    maxWidth: "1120px",
    margin: "0 auto",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "24px",
  };

  const columnStyle = {
    flex: "1",
    minWidth: "250px",
  };

  const headingStyle = {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "16px",
  };

  const paragraphStyle = {
    fontSize: "14px",
    color: "#9ca3af", // text-gray-400
    lineHeight: "1.6",
  };

  const linkListStyle = {
    listStyle: "none",
    padding: 0,
    fontSize: "14px",
    color: "#d1d5db",
  };

  const linkStyle = {
    color: "#d1d5db",
    textDecoration: "none",
    display: "block",
    marginBottom: "8px",
  };

  const bottomTextStyle = {
    textAlign: "center",
    fontSize: "14px",
    color: "#9ca3af",
    marginTop: "40px",
    borderTop: "1px solid #374151", // border-gray-700
    paddingTop: "16px",
  };

  return (
    <footer style={footerStyle}>
      <div style={containerStyle}>
        <div style={columnStyle}>
          <h2 style={headingStyle}>About Us</h2>
          <p style={paragraphStyle}>
            Guiding Futures: Building an Interactive Website for Engineering Exploration
          </p>
        </div>

        <div style={columnStyle}>
          <h2 style={headingStyle}>Quick Links</h2>
          <ul style={linkListStyle}>
            <li><a href="/" style={linkStyle}>Home</a></li>
            <li><a href="/contact" style={linkStyle}>Services</a></li>
            <li><a href="/blog" style={linkStyle}>Blog</a></li>
            <li><a href="/quiz" style={linkStyle}>Contact</a></li>
          </ul>
        </div>

        <div style={columnStyle}>
          <img src={Logo} alt="A description"></img>
        </div>
      </div>

      <div style={bottomTextStyle}>
        © {new Date().getFullYear()} The School Of ETD. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;