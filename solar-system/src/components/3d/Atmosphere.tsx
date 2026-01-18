import { useMemo } from 'react';
import * as THREE from 'three';

interface AtmosphereProps {
  radius: number;
  color: string;
  intensity: number;
  pow: number;
  sunPosition: THREE.Vector3;
}

export function Atmosphere({ radius, color, intensity, pow, sunPosition }: AtmosphereProps) {
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        atmosphereColor: { value: new THREE.Color(color) },
        atmosphereIntensity: { value: intensity },
        atmospherePow: { value: pow },
        cameraPosition: { value: new THREE.Vector3() },
      },
      vertexShader: `
        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vNormal = normalize(normalMatrix * normal);
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 atmosphereColor;
        uniform float atmosphereIntensity;
        uniform float atmospherePow;
        uniform vec3 cameraPosition;

        varying vec3 vNormal;
        varying vec3 vWorldPosition;

        void main() {
          vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
          float fresnel = dot(viewDirection, vNormal);
          fresnel = pow(1.0 - abs(fresnel), atmospherePow);

          vec3 color = atmosphereColor * fresnel * atmosphereIntensity;
          float alpha = fresnel * atmosphereIntensity;

          gl_FragColor = vec4(color, alpha);
        }
      `,
      transparent: true,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, [color, intensity, pow]);

  return (
    <mesh>
      <sphereGeometry args={[radius, 64, 64]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
