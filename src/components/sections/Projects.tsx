/**
 * Projects Section Component
 * 
 * Projects showcase section with CMS-driven content support.
 */

import React from 'react';
import type { ProjectsContent } from '../../types/content';

interface ProjectsProps {
  content: ProjectsContent;
}

export const Projects: React.FC<ProjectsProps> = ({ content }) => {
  // Sort projects by order
  const sortedProjects = [...content.projects].sort((a, b) => a.order - b.order);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">{content.sectionTag}</span>
          <h2 className="section-title">{content.sectionTitle}</h2>
          <p className="section-subtitle">{content.sectionSubtitle}</p>
        </div>
        
        <div className="projects-grid">
          {sortedProjects.map((project) => (
            <div key={project.id} className="project-card">
              <div className="project-image">
                {project.image ? (
                  <img 
                    src={project.image.url} 
                    alt={project.image.alt || project.title}
                    loading="lazy"
                  />
                ) : (
                  <div className="project-placeholder">
                    <span>{content.placeholderText || 'Coming Soon'}</span>
                  </div>
                )}
              </div>
              <div className="project-content">
                <span className="project-category">{project.category}</span>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">
                  {project.shortDescription || project.description}
                </p>
                {project.technologies && project.technologies.length > 0 && (
                  <div className="project-technologies">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">{tech}</span>
                    ))}
                  </div>
                )}
                {(project.liveUrl || project.githubUrl) && (
                  <div className="project-links">
                    {project.liveUrl && (
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        View Live
                      </a>
                    )}
                    {project.githubUrl && (
                      <a 
                        href={project.githubUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        GitHub
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
