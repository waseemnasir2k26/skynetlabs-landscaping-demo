"use client";
import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Low-poly estate mansion + instanced pollen particles:
 * - Simple house shape (boxes + roof prism)
 * - HDRI via Environment preset="sunset"
 * - 300 instanced pollen/dust particles (drifting white dots)
 * - 0.05 rad/s orbit auto-rotate w/ pause-on-drag
 * - Reduce-motion = already handled by parent Hero.tsx
 */

function MansionBuilding() {
  const roofMat = new THREE.MeshStandardMaterial({ color: "#5C3A1E", roughness: 0.7 });
  const wallMat = new THREE.MeshStandardMaterial({ color: "#E8E0D0", roughness: 0.5 });
  const windowMat = new THREE.MeshPhysicalMaterial({
    color: "#A8C8E8",
    transmission: 0.7,
    ior: 1.45,
    roughness: 0.05,
    emissive: "#FFF5C0",
    emissiveIntensity: 0.3,
  });

  return (
    <group>
      {/* Main body */}
      <mesh position={[0, 1.5, 0]} material={wallMat} castShadow receiveShadow>
        <boxGeometry args={[6, 3, 4]} />
      </mesh>
      {/* Wings */}
      <mesh position={[-3.5, 1, 0]} material={wallMat} castShadow>
        <boxGeometry args={[1, 2, 3]} />
      </mesh>
      <mesh position={[3.5, 1, 0]} material={wallMat} castShadow>
        <boxGeometry args={[1, 2, 3]} />
      </mesh>

      {/* Roof (prism via scaled box + rotation) */}
      <mesh position={[0, 3.5, 0]} rotation={[0, 0, Math.PI / 4]} castShadow>
        <boxGeometry args={[4.2, 4.2, 4.4]} />
        <primitive object={roofMat} attach="material" />
      </mesh>

      {/* Windows */}
      {[-1.8, 0, 1.8].map((x, i) => (
        <mesh key={i} position={[x, 1.6, 2.01]} material={windowMat}>
          <planeGeometry args={[0.7, 1.0]} />
        </mesh>
      ))}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#3A5A2A" roughness={0.9} />
      </mesh>
    </group>
  );
}

function PollenParticles() {
  const COUNT = 300;
  const positions = React.useMemo(() => {
    const pos = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = Math.random() * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  const pointsRef = React.useRef<THREE.Points>(null!);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const pos = pointsRef.current.geometry.attributes.position;
      const arr = pos.array as Float32Array;
      const t = clock.getElapsedTime();
      for (let i = 0; i < COUNT; i++) {
        arr[i * 3 + 1] = ((positions[i * 3 + 1] + t * 0.05 * (i % 3 === 0 ? 1.2 : 0.7)) % 8);
        arr[i * 3] = positions[i * 3] + Math.sin(t * 0.3 + i) * 0.03;
      }
      pos.needsUpdate = true;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <PointMaterial
        transparent
        color="#FFFFFF"
        size={0.04}
        sizeAttenuation
        depthWrite={false}
        opacity={0.7}
      />
    </points>
  );
}

function SceneGroup() {
  const groupRef = React.useRef<THREE.Group>(null!);
  const isDragging = React.useRef(false);

  useFrame(() => {
    if (groupRef.current && !isDragging.current) {
      groupRef.current.rotation.y += 0.0003; // ~0.05 rad/s at 60fps
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerDown={() => { isDragging.current = true; }}
      onPointerUp={() => { isDragging.current = false; }}
    >
      <MansionBuilding />
      <PollenParticles />
    </group>
  );
}

interface MansionProps {
  posterSrc?: string;
}

export default function Mansion({ posterSrc: _posterSrc = "/hero/poster.jpg" }: MansionProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[#EFE9DD]" />
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [10, 8, 14], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ position: "absolute", inset: 0 }}
      >
        <directionalLight
          position={[10, 15, 8]}
          intensity={2.5}
          color="#FFE8A0"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <ambientLight intensity={0.5} />
        <Environment preset="sunset" />
        <React.Suspense fallback={null}>
          <SceneGroup />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
