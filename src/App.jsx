import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MagicCursor from './components/MagicCursor';

import Navbar from './components/Navbar';

import Home from './pages/Home';
import About from './pages/About';
import Skills from './pages/Skills';
import Projects from './pages/Projects';
import Timeline from './pages/Timeline';
import Contact from './pages/Contact';
import Loader from './components/Loader';
import './utils/preload'; 
function App() {
  return (
    <Router>
      <MagicCursor/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
