/**
 * Navbar Component
 * 
 * Navigation bar with CMS-driven content support.
 */

import React, { useState } from 'react';
import type { NavigationContent } from '../../types/content';
import { MenuIcon, CloseIcon } from '../icons/ServiceIcons';

interface NavbarProps {
  content: NavigationContent;
}

export const Navbar: React.FC<NavbarProps> = ({ content }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <a href="#" className="logo">
          {content.logoImage ? (
            <img src={content.logoImage} alt={content.logoText} className="logo-image" />
          ) : (
            <span className="logo-text">{content.logoText}</span>
          )}
        </a>
        
        <ul className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          {content.links.map((link) => (
            <li key={link.id}>
              <a 
                href={link.href} 
                onClick={handleLinkClick}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        
        <a href={content.ctaButton.href} className="btn btn-primary nav-cta">
          {content.ctaButton.label}
        </a>
        
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
