import React, { useState } from 'react';
import '../styles/navbar.css';

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const imageUrl = URL.createObjectURL(event.target.files[0]);
      setProfileImage(imageUrl);
    }
  };

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <div className="logo">
          <a href="/" className="logo-link">
            Task Manager
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="desktop-menu">
          <a href="/" className="nav-link">Home</a>
          <a href="/tasks" className="nav-link">Tasks</a>
          <a href="/profile" className="nav-link">Profile</a>
        </nav>

        

     
        <button className="mobile-menu-button" onClick={toggleMobileMenu}>
          <span className="hamburger-icon">&#9776;</span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <a href="/" className="mobile-nav-link">Home</a>
        <a href="/tasks" className="mobile-nav-link">Tasks</a>
        <a href="/profile" className="mobile-nav-link">Profile</a>
      </div>
    </header>
  );
};

export default Header;
