import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function Butterfly() {
  const { scene } = useGLTF('/models/butterfly.glb');
  const ref = useRef();

  // Random parameters for flight path
  const params = useMemo(() => ({
    speed: 0.5 + Math.random(),
    amplitude: 1 + Math.random() * 1.5,
    frequency: 0.5 + Math.random(),
    baseX: (Math.random() - 0.5) * 5,
    baseY: (Math.random() - 0.5) * 5,
    baseZ: (Math.random() - 0.5) * 5,
    phase: Math.random() * Math.PI * 2,
  }), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * params.speed;

    const x = params.baseX + Math.sin(t + params.phase) * params.amplitude;
    const y = params.baseY + Math.cos(t * 0.8 + params.phase) * params.amplitude * 0.6;
    const z = params.baseZ + Math.sin(t * params.frequency + params.phase) * params.amplitude;

    ref.current.position.set(x, y, z);
    ref.current.rotation.y = Math.sin(t + params.phase) * 0.5;
  });

  return (
    <primitive object={scene.clone()} ref={ref} scale={1.8} />
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={1.2} />
      <pointLight position={[5, 5, 5]} intensity={2} />
      <Sparkles count={300} scale={6} size={2} speed={0.5} color="#00ffff" />

      {Array.from({ length: 6 }).map((_, i) => (
        <Butterfly key={i} />
      ))}

      <OrbitControls enableZoom={false} enablePan={false} autoRotate />
    </>
  );
}

export default function ButterflyCanvas() {
  const isMobile = window.innerWidth < 768;
  return (
    
    <Canvas style={{
        width: '100%',      // full width on small screens
        maxWidth: 200,      // max width for larger screens
        height: 200,        // fixed height, can adjust if needed
        touchAction: 'none', 
        marginLeft:isMobile?'30%':'0px',
        zIndex:1,
        // better touch behavior on mobile
      }}>
      <Scene />
    </Canvas>
  );
}
