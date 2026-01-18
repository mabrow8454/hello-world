import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { SUN_CONFIG } from '@/data/planets';

export function Sun() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const sunTexture = useLoader(TextureLoader, SUN_CONFIG.textures.albedo);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.02;
    }
  });

  return (
    <group>
      {/* Point light for illuminating planets */}
      <pointLight
        position={[0, 0, 0]}
        intensity={2.5}
        distance={0}
        decay={0}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Sun sphere */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[SUN_CONFIG.radius, 64, 64]} />
        <meshStandardMaterial
          map={sunTexture}
          emissive={SUN_CONFIG.color}
          emissiveIntensity={SUN_CONFIG.emissiveIntensity}
          toneMapped={false}
        />
      </mesh>

      {/* Glow sphere */}
      <mesh scale={1.05}>
        <sphereGeometry args={[SUN_CONFIG.radius, 32, 32]} />
        <meshBasicMaterial
          color={SUN_CONFIG.color}
          transparent
          opacity={0.2}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}
