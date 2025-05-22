import { useRef, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const Floating_Model = () => {
   const gltf = useGLTF('/models/crystal_planet.glb');
  const ref = useRef();

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(gltf.scene);
    const center = box.getCenter(new THREE.Vector3());
    gltf.scene.position.sub(center); // center the model
  }, [gltf]);

  return (
    <group ref={ref} scale={[0.25, 0.25, 0.25]} position={[0, -1, 0]}>
      <primitive object={gltf.scene} />
    </group>
  );
};

export default Floating_Model;


