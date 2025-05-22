import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Html, Stars } from '@react-three/drei';

const SkillSphere = ({ label }) => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color="#00ffff" emissive="#004d4d" />
        <Html center style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 'bold' }}>
          {label}
        </Html>
      </mesh>
    </Float>
  );
};

const SkillOrbit = ({ label }) => {
  return (
    <div style={{ width: '150px', height: '150px' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight />
        <Stars radius={2} depth={5} count={30} factor={2} saturation={0} fade />
        <Suspense fallback={null}>
          <SkillSphere label={label} />
        </Suspense>
        <OrbitControls enableZoom={false} enableRotate={false} />
      </Canvas>
    </div>
  );
};

export default SkillOrbit;
