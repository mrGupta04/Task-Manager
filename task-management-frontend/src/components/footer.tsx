import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

interface FooterLink {
  title: string;
  url: string;
  external?: boolean;
}

const Footer: React.FC = () => {
  // Footer navigation links
  const companyLinks: FooterLink[] = [
    { title: 'About Us', url: '/about' },
    { title: 'Contact US', url: '/contact' },
  ];

  return (
    <footer className="modern-footer">
      <div className="modern-footer__container">
        {/* Footer Content */}
        <div className="modern-footer__content">
          {/* Brand Section */}
          <div className="modern-footer__brand">
            <Link to="/" className="modern-footer__logo">
              <span className="modern-footer__logo-icon">🚀</span>
              <span className="modern-footer__logo-text">TaskFlow</span>
            </Link>
            <p className="modern-footer__tagline">
              The modern task management solution for teams and individuals.
            </p>
            <div className="modern-footer__social">
              <a
                href="https://facebook.com"
                className="modern-footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                className="modern-footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://linkedin.com"
                className="modern-footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com"
                className="modern-footer__social-link"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="modern-footer__links">
            <div className="modern-footer__links-group">
              <h3 className="modern-footer__links-title">Company</h3>
              <ul className="modern-footer__links-list">
                {companyLinks.map((link) => (
                  <li key={link.title} className="modern-footer__links-item">
                    {link.external ? (
                      <a 
                        href={link.url} 
                        className="modern-footer__link"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.title}
                      </a>
                    ) : (
                      <Link to={link.url} className="modern-footer__link">
                        {link.title}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright and Bottom Section */}
        <div className="modern-footer__bottom">
          <div className="modern-footer__copyright">
            &copy; {new Date().getFullYear()} TaskFlow. All rights reserved.
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;