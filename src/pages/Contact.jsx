// src/pages/Contact.jsx
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import '../styles/Contact.css';
import Starfeild from '../components/Starfield'
const Contact = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  return (
    <div className="contact-container">
     <Starfeild/>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: true, zIndex: -1 },
          particles: {
            number: { value: 40 },
            color: { value: "#00ffff" },
            shape: { type: "circle" },
            opacity: { value: 0.15 },
            size: { value: 2 },
            move: {
              enable: true,
              speed: 0.6,
              random: true,
              straight: false,
              outModes: { default: "out" },
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
            },
          },
          background: {
            color: "#1f1c2c",
          },
        }}
      />

      <div className="contact-content">

        <div className="contact-left">
          <h1 className="contact-title">Get In Touch ✨</h1>
        </div>

        <div className="contact-right">
          <div className="contact-card">
            <form className="contact-form">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" placeholder="Your Name" required />

              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="you@example.com" required />

              <label htmlFor="message">Message</label>
              <textarea id="message" rows="5" placeholder="Write your message..." required />

              <button type="submit">Send Message 🚀</button>
            </form>

            <div className="contact-info">
              <h3>Or find me on:</h3>
              <div className="socials">
                <a href="https://github.com/smadhiva" target="_blank" rel="noreferrer">GitHub</a>
                <a href="https://www.linkedin.com/in/smadhi1234" target="_blank" rel="noreferrer">LinkedIn</a>
                <a href="mailto:smadhivanan1234@gmail.com">Email</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
