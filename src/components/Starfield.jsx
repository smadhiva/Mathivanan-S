import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';


const Starfield = () => {
  return (
    <Canvas
      className="starfield"
      camera={{ position: [0, 0, 10] }}
      style={{ position: 'fixed', top: 100, left: 0, width: '100vw', height: '100vh' }}
    >
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
    </Canvas>
  );
};

export default Starfield;
