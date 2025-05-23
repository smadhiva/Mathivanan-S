
import React from "react";

export default function Times({ projects }) {
  return (
    <div className="timeline-grid">
      {projects.map((proj, i) => (
        <div className="magical-card" key={i}>
          <div className="semester-label">{proj.semester}</div>
          <h3>{proj.title}</h3>
          <div className="tech">{proj.tech}</div>
          <p>{proj.description}</p>
          <a
            href={proj.link}
            target="_blank"
            rel="noreferrer"
            className="project-link"
          >
            View Project
          </a>
        </div>
      ))}
    </div>
  );
}
