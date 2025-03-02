import React, { useState, useEffect } from 'react';
import "../styles/navbar.css";

const API_BASE_URL = "http://localhost:5000"; // Adjust to your backend URL

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Load profile image from localStorage (or replace with API call)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    if (userData.profile_pic) {
      setProfileImage(`${API_BASE_URL}/uploads/${userData.profile_pic}`);
    }
  }, []);

  return (
    <header className="modern-navbar">
      <div className="modern-navbar__container">
        {/* Logo */}
        <div className="modern-navbar__logo">
          <a href="/" className="modern-navbar__logo-link">
            Task Manager
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="modern-navbar__desktop-menu">
          <a href="/" className="modern-navbar__desktop-link">Home</a>
          <a href="/profile" className="modern-navbar__profile-link">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="modern-navbar__profile-image" />
            ) : (
              <i className="fas fa-user-circle modern-navbar__profile-icon"></i>
            )}
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button className="modern-navbar__mobile-menu-button" onClick={toggleMobileMenu}>
          <span className="modern-navbar__hamburger-icon">&#9776;</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`modern-navbar__mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="/" className="modern-navbar__mobile-nav-link">Home</a>
        <a href="/tasks" className="modern-navbar__mobile-nav-link">Tasks</a>
        <a href="/profile" className="modern-navbar__mobile-nav-link">Profile</a>
      </div>
    </header>
  );
};

export default Header;