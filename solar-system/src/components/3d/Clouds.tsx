import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface CloudsProps {
  radius: number;
  texture: string;
  opacity: number;
  rotationSpeed: number;
  planetRotation: number;
}

export function Clouds({ radius, texture, opacity, rotationSpeed, planetRotation }: CloudsProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const cloudTexture = useLoader(TextureLoader, texture);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.0002 * rotationSpeed;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[radius, 64, 64]} />
      <meshStandardMaterial
        map={cloudTexture}
        transparent
        opacity={opacity}
        depthWrite={false}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}
