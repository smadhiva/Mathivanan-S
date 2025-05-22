// pages/Home.js
import UniverseModel from '../components/UniverseModel';
import '../styles/Home.css';
import Starfield from '../components/Starfield';
import IntroText from '../components/IntroText';

const Home = () => {
  return (
    <div className="home-container">
      <Starfield/>
      <IntroText/>
      <UniverseModel/>         
      </div>
  );
};

export default Home;
