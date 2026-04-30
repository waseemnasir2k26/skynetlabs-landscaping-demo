"use client";
import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, SoftShadows, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

/**
 * Isometric 3D penthouse floorplan:
 * - Walls as Box geometries, glass floor as Plane w/ transmission
 * - Sun-shaft via SoftShadows + directional light
 * - Ocean plane with sin-wave vertex displacement via MeshDistortMaterial
 * - Wireframe-to-solid morph on load (opacity 0→1 over 1.5s)
 * - 22° orbit auto-rotate, tilt-down 6°
 */

function WireframeOverlay({ progress }: { progress: number }) {
  const mat = new THREE.MeshBasicMaterial({
    color: "#C2A35A",
    wireframe: true,
    transparent: true,
    opacity: Math.max(0, 1 - progress * 2),
  });
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
      <planeGeometry args={[8, 6, 16, 12]} />
      <primitive object={mat} attach="material" />
    </mesh>
  );
}

function PenthouseFloorplan() {
  const groupRef = React.useRef<THREE.Group>(null!);
  const [progress, setProgress] = React.useState(0);

  useFrame(({ clock }) => {
    // Wireframe-to-solid: 0→1 over 1.5s
    setProgress(Math.min(clock.getElapsedTime() / 1.5, 1));

    if (groupRef.current) {
      // 22° orbit auto-rotate, tilt-down 6°
      const t = clock.getElapsedTime() * 0.05;
      groupRef.current.rotation.y = t;
      groupRef.current.rotation.x = 0.105; // 6°
    }
  });

  const wallMat = new THREE.MeshPhysicalMaterial({
    color: "#F2EFE9",
    roughness: 0.4,
    metalness: 0,
    transparent: true,
    opacity: progress,
  });

  const glassMat = new THREE.MeshPhysicalMaterial({
    color: "#7CC4C4",
    roughness: 0.05,
    metalness: 0,
    transmission: 0.95,
    ior: 1.45,
    transparent: true,
    opacity: 0.7 * progress,
  });

  const floorMat = new THREE.MeshStandardMaterial({
    color: "#E8E0D0",
    roughness: 0.6,
    transparent: true,
    opacity: progress,
  });

  return (
    <group ref={groupRef}>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[8, 6]} />
        <primitive object={floorMat} attach="material" />
      </mesh>

      {/* Outer walls */}
      {[
        { pos: [0, 0.5, -3] as [number,number,number], size: [8, 1, 0.1] as [number,number,number] },
        { pos: [0, 0.5, 3] as [number,number,number], size: [8, 1, 0.1] as [number,number,number] },
        { pos: [-4, 0.5, 0] as [number,number,number], size: [0.1, 1, 6] as [number,number,number] },
        { pos: [4, 0.5, 0] as [number,number,number], size: [0.1, 1, 6] as [number,number,number] },
      ].map((w, i) => (
        <mesh key={i} position={w.pos} castShadow receiveShadow>
          <boxGeometry args={w.size} />
          <primitive object={wallMat} attach="material" />
        </mesh>
      ))}

      {/* Interior walls */}
      <mesh position={[0, 0.5, 0]} castShadow>
        <boxGeometry args={[0.1, 1, 3]} />
        <primitive object={wallMat} attach="material" />
      </mesh>

      {/* Glass balcony panels */}
      {[-2.5, 0, 2.5].map((x, i) => (
        <mesh key={i} position={[x, 0.6, 3.05]} castShadow>
          <boxGeometry args={[2.2, 1.2, 0.05]} />
          <primitive object={glassMat} attach="material" />
        </mesh>
      ))}

      {/* Ocean plane far distance */}
      <mesh position={[0, -0.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[40, 40, 32, 32]} />
        <MeshDistortMaterial
          color="#4A90B8"
          roughness={0.1}
          metalness={0.2}
          distort={0.08}
          speed={1.2}
          transparent
          opacity={0.7 * progress}
        />
      </mesh>

      <WireframeOverlay progress={progress} />
    </group>
  );
}

interface FloorplanProps {
  posterSrc?: string;
}

export default function Floorplan({ posterSrc: _posterSrc = "/hero/poster.jpg" }: FloorplanProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0B0B0C]" />
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [6, 8, 10], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ position: "absolute", inset: 0 }}
      >
        <SoftShadows size={10} samples={16} focus={0.5} />
        <directionalLight
          position={[8, 12, 6]}
          intensity={3}
          color="#FFF8E7"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <ambientLight intensity={0.3} />
        <Environment preset="city" />
        <React.Suspense fallback={null}>
          <PenthouseFloorplan />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
