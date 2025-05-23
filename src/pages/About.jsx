import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import '../styles/About.css';

import Floating_Model from '../components/Floating_Model';
import Starfield from '../components/Starfield';

// Text block
const AboutText = () => (
  <motion.div
    className="about-text"
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 1 }}
  >
    <h2>✨ About Me</h2>
    <p>
      Hello! I'm <strong>Mathivanan S</strong>, a passionate AI and full-stack developer driven by curiosity and creativity.
    </p>
    <p>
      I'm currently pursuing B.Tech in CSE (Artificial Intelligence).
    </p>
    <p>
      I enjoy building intelligent systems, exploring the world of large language models, and crafting meaningful user experiences that blend technology with purpose.
    </p>
    <p>
      When I’m not coding, you’ll find me diving into experimenting with generative art, or learning new ways to make tech more human.
    </p>
    <p>
      <a href="/Resume.pdf" download className="download-btn">
        Download My Resume
      </a>
    </p>
  </motion.div>
);

// Main component
const About = () => {
  const [cameraPos, setCameraPos] = useState([50, 100, 150]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCameraPos([0, 5, 10]); // mobile view
      } else {
        setCameraPos([50, 100, 150]); // desktop view
      }
    };

    handleResize(); // check initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section id="about" className="about-section">
      <Starfield />
      <div className="about-container">
        <AboutText />
        <motion.div
          className="about-3d"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Canvas
            camera={{ position: cameraPos, fov: 60 }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[0, 2, 5]} intensity={1.2} />
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              minDistance={5}
              maxDistance={20}
            />
            <Floating_Model />
          </Canvas>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
