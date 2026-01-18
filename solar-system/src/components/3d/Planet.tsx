import { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { PlanetConfig } from '@/data/planets';
import { Atmosphere } from './Atmosphere';
import { Clouds } from './Clouds';
import { Rings } from './Rings';

interface PlanetProps {
  config: PlanetConfig;
  time: number;
  sunPosition: THREE.Vector3;
}

export function Planet({ config, time, sunPosition }: PlanetProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);

  // Load textures
  const textures = useLoader(TextureLoader, [
    config.textures.albedo,
    ...(config.textures.normal ? [config.textures.normal] : []),
    ...(config.textures.specular ? [config.textures.specular] : []),
    ...(config.textures.night ? [config.textures.night] : []),
  ]);

  const [albedoMap, normalMap, specularMap, nightMap] = useMemo(() => {
    const maps = [...textures];
    return [
      maps[0],
      config.textures.normal ? maps[1] : null,
      config.textures.specular ? maps[config.textures.normal ? 2 : 1] : null,
      config.textures.night
        ? maps[
            (config.textures.normal ? 1 : 0) + (config.textures.specular ? 1 : 0) + 1
          ]
        : null,
    ];
  }, [textures, config]);

  // Calculate orbital position
  const orbitalAngle = (time / config.orbitalPeriod) * Math.PI * 2;
  const x = Math.cos(orbitalAngle) * config.distance * 30; // Scale for visual spacing
  const z = Math.sin(orbitalAngle) * config.distance * 30;

  // Update rotation
  useFrame((state, delta) => {
    if (meshRef.current) {
      const rotationSpeed = (Math.PI * 2) / config.rotationPeriod;
      meshRef.current.rotation.y += rotationSpeed * delta * 0.01;
    }
  });

  // Create material
  const material = useMemo(() => {
    if (nightMap) {
      // Custom shader material for Earth with night lights
      return new THREE.ShaderMaterial({
        uniforms: {
          albedoMap: { value: albedoMap },
          nightMap: { value: nightMap },
          hasNightMap: { value: true },
          sunPosition: { value: sunPosition },
          nightIntensity: { value: 2.5 },
        },
        vertexShader: `
          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;

          void main() {
            vUv = uv;
            vNormal = normalize(normalMatrix * normal);
            vec4 worldPosition = modelMatrix * vec4(position, 1.0);
            vWorldPosition = worldPosition.xyz;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `,
        fragmentShader: `
          uniform sampler2D albedoMap;
          uniform sampler2D nightMap;
          uniform bool hasNightMap;
          uniform vec3 sunPosition;
          uniform float nightIntensity;

          varying vec2 vUv;
          varying vec3 vNormal;
          varying vec3 vWorldPosition;

          void main() {
            vec3 sunDirection = normalize(sunPosition - vWorldPosition);
            float sunDot = dot(vNormal, sunDirection);

            vec4 dayColor = texture2D(albedoMap, vUv);
            vec4 nightColor = texture2D(nightMap, vUv);

            float nightMix = smoothstep(0.1, -0.1, sunDot);
            vec3 nightEmission = nightColor.rgb * nightMix * nightIntensity;

            vec3 finalColor = dayColor.rgb + nightEmission;
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `,
      });
    } else {
      // Standard PBR material
      return new THREE.MeshStandardMaterial({
        map: albedoMap,
        normalMap: normalMap || undefined,
        metalnessMap: specularMap || undefined,
        metalness: config.material.metalness || 0,
        roughness: config.material.roughness || 0.5,
        emissive: config.material.emissive
          ? new THREE.Color(config.material.emissive)
          : undefined,
        emissiveIntensity: config.material.emissiveIntensity || 0,
      });
    }
  }, [albedoMap, normalMap, specularMap, nightMap, config, sunPosition]);

  return (
    <group ref={groupRef} position={[x, 0, z]}>
      {/* Main planet mesh */}
      <mesh ref={meshRef} castShadow receiveShadow>
        <sphereGeometry args={[config.radius, 64, 64]} />
        <primitive object={material} attach="material" />
      </mesh>

      {/* Atmosphere */}
      {config.features?.atmosphere && (
        <Atmosphere
          radius={config.radius * 1.05}
          color={config.features.atmosphere.color}
          intensity={config.features.atmosphere.intensity}
          pow={config.features.atmosphere.pow}
          sunPosition={sunPosition}
        />
      )}

      {/* Clouds (Earth) */}
      {config.features?.clouds && config.textures.clouds && (
        <Clouds
          radius={config.radius * 1.01}
          texture={config.textures.clouds}
          opacity={config.features.clouds.opacity}
          rotationSpeed={config.features.clouds.rotationSpeed}
          planetRotation={meshRef.current?.rotation.y || 0}
        />
      )}

      {/* Rings (Saturn) */}
      {config.features?.rings && (
        <Rings
          innerRadius={config.radius * config.features.rings.innerRadius}
          outerRadius={config.radius * config.features.rings.outerRadius}
          texture={config.features.rings.texture}
          planetRadius={config.radius}
        />
      )}
    </group>
  );
}
