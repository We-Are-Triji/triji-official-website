/**
 * Footer Component
 * 
 * Footer section with CMS-driven content support.
 */

import React from 'react';
import type { FooterContent } from '../../types/content';

interface FooterProps {
  content: FooterContent;
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  // Replace {year} placeholder with current year
  const copyrightText = content.copyrightText.replace('{year}', new Date().getFullYear().toString());

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="logo-text">{content.brandName}</span>
            <p className="footer-tagline">{content.tagline}</p>
          </div>
          <div className="footer-links">
            {content.links.map((link) => (
              <a 
                key={link.id} 
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        
        {content.socialLinks && content.socialLinks.length > 0 && (
          <div className="footer-social">
            {content.socialLinks.map((social) => (
              <a 
                key={social.id}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className={`social-link social-${social.platform}`}
              >
                {social.label}
              </a>
            ))}
          </div>
        )}
        
        <div className="footer-bottom">
          <p>{copyrightText}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
