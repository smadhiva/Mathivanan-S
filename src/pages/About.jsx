import { Canvas } from '@react-three/fiber';
import { OrbitControls} from '@react-three/drei';
import { motion } from 'framer-motion';
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
      I'm currently pursuing B.Tech in CSE (Artificial Intelligence) and interning at <strong>Brainwave Matrix Solutions</strong>, where I’m working on projects like fake news detection and generative AI applications.
    </p>
    <p>
      I enjoy building intelligent systems, exploring the world of large language models, and crafting meaningful user experiences that blend technology with purpose.
    </p>
    <p>
      When I’m not coding, you’ll find me diving into experimenting with generative art, or learning new ways to make tech more human.
    </p>
  </motion.div>
);


// Main component
const About = () => {
  return (
    <section id="about" className="about-section">
        <Starfield></Starfield>
      <div className="about-container">
        <AboutText />

        <motion.div
          className="about-3d"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Canvas camera={{ position: [0, 1.5, 10], fov: 45 }}>
  <ambientLight intensity={0.8} />
  <directionalLight position={[0, 2, 5]} intensity={1.2} />
  <OrbitControls 
    enableZoom={true} 
    enablePan={true} 
    minDistance={3} 
    maxDistance={10} 
  />
  <Floating_Model />
</Canvas>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
