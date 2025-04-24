import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // or your preferred icon lib

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

  const socialIconStyle = {
    display: "flex",
    gap: "16px",
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
            <li><a href="/blog" style={linkStyle}>Case Studies</a></li>
            <li><a href="/quiz" style={linkStyle}>Contact</a></li>
          </ul>
        </div>

        <div style={columnStyle}>
          <h2 style={headingStyle}>Follow Us</h2>
          <div style={socialIconStyle}>
            <a href="https://www.facebook.com"><Facebook color="#9ca3af" /></a>
            <a href="https://www.twitter.com"><Twitter color="#9ca3af" /></a>
            <a href="https://www.instagram.com"><Instagram color="#9ca3af" /></a>
            <a href="https://www.linkedin.com"><Linkedin color="#9ca3af" /></a>
          </div>
        </div>
      </div>

      <div style={bottomTextStyle}>
        © {new Date().getFullYear()} Canterbury Christ Church University. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;