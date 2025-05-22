import React, { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, useTexture } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import * as THREE from 'three';
import { EffectComposer, Bloom } from '@react-three/postprocessing';

const skillGroups = {
  Frontend: [
    'HTML', 'CSS', 'JavaScript', 'React', 'Angular', 'Svelte', 'Tailwind CSS', 'Bootstrap', 'Webpack', 'Next.js',
  ],
  Backend: [
    'Node.js', 'Express', 'SQL', 'MongoDB', 'Python', 'Django', 'Flask','GraphQL', 'REST API', 'Java', ,
  ],
  ML: [
    'Machine Learning', 'AI', 'TensorFlow', 'PyTorch', 'Scikit-learn', 'Keras', 'OpenCV', 'NLP', 'Computer Vision', 'Reinforcement Learning', 'Data Science', 'Pandas', 'NumPy',
  ],
  Tools: [
    'Git', 'VS Code', 'Docker', 'Postman',  'Kubernetes', 'AWS', 'Azure', 'Google Cloud', 'Linux',
  ],
  Languages: [
    'Python', 'JavaScript', 'Java', 'C++','C',
  ],
};

function Asteroid({ skill, angle, radius, setHoveredSkill }) {
  const ref = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState([
    Math.cos(angle) * radius,
    0,
    Math.sin(angle) * radius,
  ]);

  const colorMap = useTexture('/asteroid.jpg');

  useFrame(({ clock }) => {
    if (!isDragging) {
      const t = clock.getElapsedTime();
      const dynamicAngle = angle + t * 0.2;
      const x = Math.cos(dynamicAngle) * radius;
      const z = Math.sin(dynamicAngle) * radius;
      ref.current.position.set(x, 0, z);
    }
  });

  const bind = useDrag(({ down, movement: [mx, my] }) => {
    setIsDragging(down);
    if (down) {
      const factor = 0.01;
      const newPos = [
        position[0] + mx * factor,
        position[1] - my * factor,
        position[2],
      ];
      ref.current.position.set(...newPos);
    } else {
      setPosition([...ref.current.position.toArray()]);
    }
  });

  return (
    <mesh
      {...bind()}
      ref={ref}
      onPointerOver={() => setHoveredSkill(skill)}
      onPointerOut={() => setHoveredSkill(null)}
      castShadow
    >
      <sphereGeometry args={[0.45, 32, 32]} />
      <meshStandardMaterial
        map={colorMap}
        roughness={1}
        emissive={new THREE.Color(0x404040)}
        emissiveIntensity={0.8}
      />
    </mesh>
  );
}

function CenterAvatar() {
  const ref = useRef();
  const texture = useTexture('/avatar.jpeg'); // Your avatar/logo image

  useFrame(() => {
    ref.current.rotation.y += 0.005;
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <icosahedronGeometry args={[0.8, 1]} />
      <meshStandardMaterial map={texture} metalness={0.5} roughness={0.2} />
    </mesh>
  );
}

export default function SkillOrbit() {
  const [hoveredSkill, setHoveredSkill] = useState(null);

  let index = 0;
  const totalSkills = Object.values(skillGroups).reduce((acc, arr) => acc + arr.length, 0);
  
  const baseRadius = 5;
const orbitSpacing = 2;

const skillData = Object.entries(skillGroups).flatMap(([group, skills], groupIdx) => {
  const radius = baseRadius + groupIdx * orbitSpacing;

  return skills.map((skill, skillIdx) => {
    const angle = (skillIdx / skills.length) * 2 * Math.PI;
    return { skill, angle, radius };
  });
});


  return (
    <div style={{ width: '100vw', height: '100vh', background: 'black' }}>
      <div style={{
  position: 'fixed',
  top: '80px',
  width: '100%',
  textAlign: 'center',
  zIndex: 1000,
  color: '#00e5ff',
  fontFamily: 'Orbitron, sans-serif',
  pointerEvents: 'none',
  textShadow: `
    0 0 8pxrgb(227, 239, 240),
    0 0 20pxrgb(127, 135, 135),
    0 0 30px #00b8f4,
    0 0 40px #00b8f4,
    0 0 50px #0091ea,
    0 0 60px #0091ea,
    0 0 70px #0091ea
  `,
  
  padding: '10px 0',
  animation: 'glowPulse 3s ease-in-out infinite',
  userSelect: 'none',
}}>
        <h1 style={{ fontSize: '3rem', margin: 0, color:'#ccc' }}>Skill Galaxy</h1>
        <p style={{ fontSize: '1.5rem', marginTop: 5, color: '#ccc' }}>
          Hover and drag to explore skills
        </p>
      </div>

      <Canvas shadows camera={{ position: [0, 3, 10], fov: 60 }}>
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={5} />
        <directionalLight position={[5, 10, 7]} intensity={1} castShadow />

        <EffectComposer>
          <Bloom luminanceThreshold={0} luminanceSmoothing={0.8} height={300} intensity={1.5} />
        </EffectComposer>

        <Suspense fallback={null}>
          <Stars radius={60} depth={120} count={4000} factor={4} fade />
          <CenterAvatar />
          {skillData.map(({ skill, angle, radius }) => (
            <Asteroid
              key={skill}
              skill={skill}
              angle={angle}
              radius={radius}
              setHoveredSkill={setHoveredSkill}
            />
          ))}
        </Suspense>

        <OrbitControls enablePan={false} />
      </Canvas>

      {/* Hover Tooltip */}
      {hoveredSkill && (
  <div style={{
    position: 'fixed',
    bottom: 120,            // raised up from 40 to 120px
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(10, 10, 25, 0.85)', // darker cosmic background
    color: '#7df9ff',        // neon cyan-ish color
    fontWeight: '700',
    fontSize: '1.4rem',
    padding: '12px 28px',
    borderRadius: '16px',
    boxShadow: `
      0 0 8px #7df9ff,
      0 0 16px #32f8ff,
      0 0 24px #32f8ff,
      0 0 32px #06d6f9
    `,
    pointerEvents: 'none',
    userSelect: 'none',
    zIndex: 50,
    textShadow: '0 0 6px #7df9ff',
    animation: 'floatGlow 3s ease-in-out infinite',
    fontFamily: 'Orbitron, sans-serif',
  }}>
    <style>
      {`
        @keyframes floatGlow {
          0%, 100% {
            transform: translateX(-50%) translateY(0);
            box-shadow:
              0 0 8px #7df9ff,
              0 0 16px #32f8ff,
              0 0 24px #32f8ff,
              0 0 32px #06d6f9;
          }
          50% {
            transform: translateX(-50%) translateY(-6px);
            box-shadow:
              0 0 14px #7df9ff,
              0 0 24px #32f8ff,
              0 0 32px #32f8ff,
              0 0 40px #06d6f9;
          }
        }
      `}
    </style>
    {hoveredSkill}
  </div>
)}

    </div>
  );
}
