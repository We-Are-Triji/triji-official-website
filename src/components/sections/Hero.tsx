/**
 * Hero Section Component
 * 
 * Hero section with CMS-driven content support.
 */

import React from 'react';
import type { HeroContent } from '../../types/content';
import { ArrowRightIcon } from '../icons/ServiceIcons';

interface HeroProps {
  content: HeroContent;
}

export const Hero: React.FC<HeroProps> = ({ content }) => {
  return (
    <section id="home" className="hero">
      <div className="hero-bg"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <span className="hero-tag">{content.tag}</span>
          <h1 className="hero-title">
            {content.title}
            <span className="gradient-text">{content.titleHighlight}</span>
          </h1>
          <p className="hero-subtitle">{content.subtitle}</p>
          <div className="hero-buttons">
            <a href={content.primaryButton.href} className="btn btn-primary">
              {content.primaryButton.label} <ArrowRightIcon />
            </a>
            <a href={content.secondaryButton.href} className="btn btn-secondary">
              {content.secondaryButton.label}
            </a>
          </div>
        </div>
        <div className="hero-visual">
          <div className="hero-card">
            <div className="code-window">
              <div className="code-header">
                <span className="dot red"></span>
                <span className="dot yellow"></span>
                <span className="dot green"></span>
              </div>
              <div className="code-body">
                <code>
                  <span className="keyword">const</span>{' '}
                  <span className="variable">triji</span> = {'{'}<br />
                  {content.codeSnippet?.lines.map((line, index) => (
                    <React.Fragment key={index}>
                      &nbsp;&nbsp;<span className="property">{line.property}</span>:{' '}
                      <span className="string">"{line.value}"</span>
                      {index < (content.codeSnippet?.lines.length || 0) - 1 ? ',' : ''}
                      <br />
                    </React.Fragment>
                  ))}
                  {'}'};
                </code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
