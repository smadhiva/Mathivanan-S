// components/UniverseModel.js
import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Float, Environment } from '@react-three/drei';

const Universe = () => {
  const { scene } = useGLTF('/models/space.glb');
  return <primitive object={scene} scale={5} />;
};

const UniverseModel = () => {
  return (
    <div style={{ width: '100%', height: '800px' }}>
      <Canvas
        shadows
        camera={{ position: [0, -10, 5], fov: 45 }} // Zoomed-in view
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        <Suspense fallback={null}>
          <Float speed={1.2} rotationIntensity={0.8} floatIntensity={1.5}>
            <Universe />
          </Float>
        </Suspense>

        <Environment preset="sunset" />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={1} />
      </Canvas>
    </div>
  );
};

export default UniverseModel;
