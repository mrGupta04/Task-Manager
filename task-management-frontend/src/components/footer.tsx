import React from 'react';
import '../styles/footer.css'; // Import the CSS file

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-links">
          <a href="/" className="footer-link">Home</a>
          <a href="/about" className="footer-link">About</a>
          <a href="/contact" className="footer-link">Contact</a>
        </div>

        <div className="social-media">
          <a href="https://facebook.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="https://twitter.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" className="social-icon" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
        </div>

        <div className="copyright">
          &copy; {new Date().getFullYear()} Task Manager. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;