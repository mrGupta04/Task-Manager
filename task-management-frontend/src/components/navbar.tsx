import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "../styles/navbar.css";

interface NavItem {
  name: string;
  path: string;
  icon?: string;
}

const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  const backendUrl = "https://task-manager-cjw8.onrender.com";

  const navItems: NavItem[] = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        if (user.profile_pic) {
          setProfileImage(`${backendUrl}/uploads/${user.profile_pic}`);
        }
      } catch (err) {
        console.error("Failed to parse user data from localStorage:", err);
      }
    }
  }, []);

  return (
    <header className={`modern-navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="modern-navbar__container">

        {/* Logo */}
        <div className="modern-navbar__logo">
          <Link to="/" className="modern-navbar__logo-link">
            <span className="modern-navbar__logo-icon">🚀</span>
            <span className="modern-navbar__logo-text">TaskFlow</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="modern-navbar__desktop-menu">
          <ul className="modern-navbar__desktop-list">
            {navItems.map((item) => (
              <li key={item.name} className="modern-navbar__desktop-item">
                <Link
                  to={item.path}
                  className="modern-navbar__desktop-link"
                  onClick={closeMobileMenu}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Profile */}
        <div className="modern-navbar__actions">
          <div className="modern-navbar__profile">
            <Link to="/profile" className="modern-navbar__profile-link">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="modern-navbar__profile-image"
                />
              ) : (
                <div className="modern-navbar__profile-fallback">
                  <i className="fas fa-user-circle"></i>
                </div>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`modern-navbar__mobile-menu-button ${isMobileMenuOpen ? 'open' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span className="modern-navbar__hamburger-line"></span>
          <span className="modern-navbar__hamburger-line"></span>
          <span className="modern-navbar__hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`modern-navbar__mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="modern-navbar__mobile-list">
          {navItems.map((item) => (
            <li key={item.name} className="modern-navbar__mobile-item">
              <Link
                to={item.path}
                className="modern-navbar__mobile-link"
                onClick={closeMobileMenu}
              >
                {item.name}
              </Link>
            </li>
          ))}
          <li className="modern-navbar__mobile-item">
            <Link
              to="/profile"
              className="modern-navbar__mobile-link"
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
