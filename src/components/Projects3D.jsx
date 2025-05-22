import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  Stars,
  Html,
} from '@react-three/drei';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function Island() {
  const { scene } = useGLTF('/models/island.glb');
  return <primitive object={scene} scale={0.1} position={[0, 0.5, 0]} />;
}

function OrbitingSphere({ project, index, total, onClick, speed = 0.1 }) {
  const ref = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);

  const texture = useTexture('crystal.jpg'); 
  const glowColor = ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#955251'];

  useFrame(({ clock }) => {
    const angle = (index / total) * 2 * Math.PI + clock.getElapsedTime() * speed;
    const radius = 3.5;
    const x = radius * Math.cos(angle);
    const z = radius * Math.sin(angle);
    const y = 0.5 + Math.sin(clock.getElapsedTime() * 1.5 + index) * 0.2;

    if (ref.current) {
      ref.current.position.set(x, y, z);
    }

    if (materialRef.current) {
      const flicker = 1 + 0.4 * Math.sin(clock.getElapsedTime() * 8 + index);
      materialRef.current.emissiveIntensity = flicker;
      materialRef.current.emissive.set(glowColor[index % glowColor.length]);
    }
  });

  return (
    <group ref={ref}>
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => onClick(project)}
        castShadow
      >
        <sphereGeometry args={[0.22, 64, 64]} />
        <meshStandardMaterial
          ref={materialRef}
          map={texture}
          emissive="#000"
          emissiveIntensity={0.1}
          metalness={0.7}
          roughness={0.1}
        />
      </mesh>

      {/* Outer Glow Shell */}
      <mesh>
        <sphereGeometry args={[0.25, 64, 64]} />
        <meshBasicMaterial
          color={glowColor[index % glowColor.length]}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Tooltip on hover */}
      {hovered && (
        <Html center distanceFactor={8}>
          <div
            style={{
              background: 'rgba(0, 0, 0, 0.7)',
              padding: '6px 12px',
              borderRadius: 6,
              color: '#00ffff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: 12,
              whiteSpace: 'nowrap',
              boxShadow: '0 0 8px #00ffff',
              pointerEvents: 'none',
            }}
          >
            {project.title}
          </div>
        </Html>
      )}
    </group>
  );
}

export default function Projects3D({ projects = [] }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {/* Magical Heading */}
      <h1
        style={{
          position: 'absolute',
          top: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#ffffff',
          fontSize: '3rem',
          fontWeight: 'bold',
          textShadow: '0 0 20px #00f0ff, 0 0 40px #8e44ad',
          zIndex: 10,
          fontFamily: 'Cinzel, serif',
        }}
      >
        Projects 
      </h1>
      <h2
        style={{
          position: 'absolute',
          top: 90,
          left: '50%',
          transform: 'translateX(-50%)',
          color: '#ffffff',
          fontSize: '1rem',
          fontWeight: 'bold',
          textShadow: '0 0 20px #00f0ff, 0 0 40px #8e44ad',
          zIndex: 10,
          fontFamily: 'Cinzel, serif',
        }}
      >
        Hover and Click
      </h2>


      <Canvas camera={{ position: [0, 4, 8], fov: 50 }} shadows>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Island />

        {projects.map((project, i) => (
          <OrbitingSphere
            key={project.id || i}
            project={project}
            index={i}
            total={projects.length}
            onClick={setSelected}
          />
        ))}

        <OrbitControls />
      </Canvas>

      {/* Project Detail Box */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: 100,
            left: 50,
            background: 'linear-gradient(135deg, rgba(30,30,60,0.95), rgba(80,0,90,0.95))',
            color: '#ffffff',
            padding: 30,
            borderRadius: 16,
            maxWidth: 500,
            border: '2px solid #00ffff',
            boxShadow: '0 0 25px #00ffff, 0 0 60px #8e44ad',
            zIndex: 10,
            fontFamily: 'Poppins, sans-serif',
            animation: 'fadeIn 0.5s ease-in-out',
            lineHeight: '1.6',
            fontSize: '16px',
          }}
        >
          <h2 style={{ color: '#00ffff', marginBottom: 20, fontSize: '1.5rem' }}>
            {selected.title}
          </h2>
          <p style={{ marginBottom: 20 }}>
            <strong>Description:</strong><br />
            {selected.description}
          </p>
          <p style={{ marginBottom: 20 }}>
            <strong>Tech Stack:</strong><br />
            {selected.tech}
          </p>
          <p style={{ marginBottom: 30 }}>
            <strong>GitHub:</strong>{' '}
            <a
              href={selected.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#00ffff',
                textDecoration: 'underline',
                fontWeight: 'bold',
              }}
            >
              View Repo
            </a>
          </p>
          <button
            onClick={() => setSelected(null)}
            style={{
              padding: '10px 20px',
              backgroundColor: '#00ffff',
              color: '#111',
              border: 'none',
              borderRadius: 8,
              cursor: 'pointer',
              fontWeight: 'bold',
              fontSize: '14px',
            }}
          >
            Close
          </button>
        </div>
      )}

      {/* Keyframe Animation */}
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </>
  );
}
