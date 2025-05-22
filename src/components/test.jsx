import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

export default function StarfieldTest() {
  return (
    <div style={{ width: '100vw', height: '100vh', border: '5px solid red' }}>
      <Canvas
        style={{ width: '100%', height: '100%', background: 'black' }}
        camera={{ position: [0, 0, 5] }}
      >
        <Stars
          radius={50}
          depth={20}
          count={1000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />
      </Canvas>
    </div>
  );
}
