import React, { useRef, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';
import Starfeild from '../components/Starfield';

const Contact = () => {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
     'service_tndndby',
      'template_lqsqrsg',    // e.g., template_yyy456
      form.current,
      'Gl_fW2a-fLT1AX9O7'      // e.g., QVabc12345xyz
    ).then(() => {
        setSent(true);
        form.current.reset();
      }, (error) => {
        console.error("Email sending error:", error.text);
      });
  };

  return (
    <div className="contact-container">
      <Starfeild />
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
            <form ref={form} className="contact-form" onSubmit={sendEmail}>
              <label htmlFor="name">Name</label>
              <input type="text" name="user_name" id="name" placeholder="Your Name" required />

              <label htmlFor="email">Email</label>
              <input type="email" name="user_email" id="email" placeholder="you@example.com" required />

              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="5" placeholder="Write your message..." required />

              <button type="submit">Send Message</button>
              {sent && <p style={{ color: '#7de5ff', marginTop: '10px' }}>✅ Message sent successfully!</p>}
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
