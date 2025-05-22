import { useFrame } from '@react-three/fiber';

const FloatingCube = () => {
  const mesh = useRef();

  useFrame(({ clock }) => {
    mesh.current.rotation.x = clock.getElapsedTime() / 2;
    mesh.current.rotation.y = clock.getElapsedTime() / 3;
  });

  return (
    <mesh ref={mesh} scale={1.5}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00aaff" />
    </mesh>
  );
};

export default FloatingCube;
