import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/skills">Skills</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/timeline">Timeline</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="navbar-logo">Mathivanan S</div>
    </nav>
  );
};

export default Navbar;
