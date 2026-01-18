import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';

interface RingsProps {
  innerRadius: number;
  outerRadius: number;
  texture: string;
  planetRadius: number;
}

export function Rings({ innerRadius, outerRadius, texture, planetRadius }: RingsProps) {
  const ringTexture = useLoader(TextureLoader, texture);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <ringGeometry args={[innerRadius, outerRadius, 128]} />
      <meshStandardMaterial
        map={ringTexture}
        side={THREE.DoubleSide}
        transparent
        opacity={0.9}
        depthWrite={false}
      />
    </mesh>
  );
}
