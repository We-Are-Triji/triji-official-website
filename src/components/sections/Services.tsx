/**
 * Services Section Component
 * 
 * Services section with CMS-driven content support.
 */

import React from 'react';
import type { ServicesContent } from '../../types/content';
import { ServiceIcon } from '../icons/ServiceIcons';

interface ServicesProps {
  content: ServicesContent;
}

export const Services: React.FC<ServicesProps> = ({ content }) => {
  // Sort services by order
  const sortedServices = [...content.services].sort((a, b) => a.order - b.order);

  return (
    <section id="services" className="section services-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{content.sectionTag}</span>
          <h2 className="section-title">{content.sectionTitle}</h2>
          <p className="section-subtitle">{content.sectionSubtitle}</p>
        </div>
        
        <div className="services-grid">
          {sortedServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-icon">
                <ServiceIcon 
                  iconType={service.iconType} 
                  customSvg={service.customIconSvg}
                />
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
