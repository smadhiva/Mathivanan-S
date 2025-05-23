import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  OrbitControls,
  useGLTF,
  Stars,
  Html,
  useTexture,
} from '@react-three/drei';
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
        style={{ touchAction: 'manipulation' }} // Better touch interaction
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
              padding: '8px 14px',
              borderRadius: 8,
              color: '#00ffff',
              fontFamily: 'Poppins, sans-serif',
              fontSize: window.innerWidth < 600 ? 14 : 12,
              whiteSpace: 'nowrap',
              boxShadow: '0 0 10px #00ffff',
              pointerEvents: 'none',
              userSelect: 'none',
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
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Update windowWidth on resize for responsiveness
  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Responsive styles
  const isMobile = windowWidth < 600;

  return (
    <>
     {/* Magical Heading */}
<h1
  style={{
    position: 'absolute',
    top: '10%',          // slightly more margin from top
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#ffffff',
    fontSize: '3rem',
    fontWeight: 'bold',
    textShadow: '0 0 20px #00f0ff, 0 0 40px #8e44ad',
    zIndex: 10,
    fontFamily: 'Cinzel, serif',
    whiteSpace: 'nowrap',  // prevent breaking into multiple lines
    userSelect: 'none',
  }}
>
  Projects
</h1>
<h2
  style={{
    position: 'absolute',
    top: '22%',        // more controlled spacing below h1
    left: '50%',
    transform: 'translateX(-50%)',
    color: '#ffffff',
    fontSize: '1.25rem',  // slightly bigger for better readability
    fontWeight: '600',
    textShadow: '0 0 20px #00f0ff, 0 0 40px #8e44ad',
    zIndex: 10,
    fontFamily: 'Cinzel, serif',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  }}
>
  Hover and Click
</h2>


      <Canvas
        style={{
          width: '100vw',
          height: '100vh',
          marginTop:'10%',
          touchAction: 'none', // better for touch devices
        }}
        camera={{
          position: isMobile ? [0, 3, 6] : [0, 4, 8],
          fov: isMobile ? 60 : 50,
        }}
        shadows
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
        <Stars
          radius={100}
          depth={50}
          count={isMobile ? 1000 : 5000} // fewer stars on mobile
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

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

        <OrbitControls
          enablePan={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={isMobile ? 4 : 6}
          maxDistance={isMobile ? 8 : 12}
          enableZoom={!isMobile} // optional, disable zoom on mobile for better UX
          enableRotate={true}
          // on mobile, enable touch controls by default
          // if you want to tweak controls, add more props here
        />
      </Canvas>

      {/* Project Detail Box */}
      {selected && (
        <div
          style={{
            position: 'absolute',
            top: isMobile ? 80 : 100,
            left: isMobile ? '50%' : 50,
            transform: isMobile ? 'translateX(-50%)' : 'none',
            background: 'linear-gradient(135deg, rgba(30,30,60,0.95), rgba(80,0,90,0.95))',
            color: '#ffffff',
            padding: isMobile ? '20px 16px' : 30,
            borderRadius: 16,
            maxWidth: isMobile ? '90vw' : 500,
            width: isMobile ? '90vw' : 'auto',
            border: '2px solid #00ffff',
            boxShadow: '0 0 25px #00ffff, 0 0 60px #8e44ad',
            zIndex: 10,
            fontFamily: 'Poppins, sans-serif',
            animation: 'fadeIn 0.5s ease-in-out',
            lineHeight: '1.6',
            fontSize: isMobile ? '14px' : '16px',
          }}
        >
          <h2 style={{ color: '#00ffff', marginBottom: 20, fontSize: isMobile ? '1.3rem' : '1.5rem' }}>
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
                wordBreak: 'break-word',
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
              width: '100%',
              maxWidth: 200,
              display: 'block',
              margin: '0 auto',
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
