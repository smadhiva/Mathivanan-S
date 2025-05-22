import React from 'react';
import '../styles/Timeline.css';
import ButterflyCanvas from './ButterflyCanvas';
import Starfield from './Starfield';

export default function Timeline({ projects }) {
  return (
    <div className="timeline-outer">
      <Starfield />
      <div className="timeline-container">
        {projects.map((project, index) => (
          <div key={index} className="timeline-item fade-in">
            <div className="timeline-dot" />
            <div className="timeline-inner">
              <ButterflyCanvas />
              <div className="timeline-content glassmorphic">
                <h3>{project.title}</h3>
                <p><strong>Semester:</strong> {project.semester}</p>
                <p>{project.description}</p>
                <p><strong>Tech:</strong> {project.tech}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  🔗 GitHub
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
