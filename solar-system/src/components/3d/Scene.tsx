import { Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, PerspectiveCamera } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { PLANETS, PLANET_ORDER } from '@/data/planets';
import { useAppStore } from '@/store/appStore';

function SceneContent() {
  const { currentTime, advanceTime, selectedPlanet, cameraDistance } = useAppStore();
  const sunPosition = new THREE.Vector3(0, 0, 0);
  const cameraRef = useRef<THREE.PerspectiveCamera>(null!);
  const controlsRef = useRef<any>(null);

  // Advance simulation time
  useFrame((state, delta) => {
    advanceTime(delta);

    // Update camera focus if planet is selected
    if (selectedPlanet && controlsRef.current) {
      const planet = PLANETS[selectedPlanet];
      if (planet) {
        const orbitalAngle = (currentTime / planet.orbitalPeriod) * Math.PI * 2;
        const targetX = Math.cos(orbitalAngle) * planet.distance * 30;
        const targetZ = Math.sin(orbitalAngle) * planet.distance * 30;

        // Smooth camera transition to planet
        const currentTarget = controlsRef.current.target;
        currentTarget.lerp(new THREE.Vector3(targetX, 0, targetZ), 0.05);
        controlsRef.current.update();

        // Set camera distance based on planet size
        const desiredDistance = planet.radius * 5 + 20;
        const currentDistance = cameraRef.current.position.length();
        if (Math.abs(currentDistance - desiredDistance) > 1) {
          cameraRef.current.position.normalize().multiplyScalar(
            currentDistance + (desiredDistance - currentDistance) * 0.05
          );
        }
      }
    }
  });

  return (
    <>
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        position={[0, 50, 100]}
        fov={45}
        near={0.1}
        far={10000}
      />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={30}
        maxDistance={500}
        maxPolarAngle={Math.PI / 2}
      />

      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 500, 2000]} />

      {/* Starfield */}
      <Stars
        radius={500}
        depth={100}
        count={5000}
        factor={6}
        saturation={0}
        fade
        speed={0.5}
      />

      {/* Ambient light for overall scene brightness */}
      <ambientLight intensity={0.1} />

      {/* Sun */}
      <Suspense fallback={null}>
        <Sun />
      </Suspense>

      {/* Planets */}
      {PLANET_ORDER.map((planetId) => {
        const planet = PLANETS[planetId];
        return (
          <Suspense key={planetId} fallback={null}>
            <Planet config={planet} time={currentTime} sunPosition={sunPosition} />
          </Suspense>
        );
      })}

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={0.5}
          luminanceThreshold={0.9}
          luminanceSmoothing={0.9}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}

export function Scene() {
  return (
    <Canvas
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.0,
      }}
      shadows
      dpr={[1, 2]}
    >
      <SceneContent />
    </Canvas>
  );
}
