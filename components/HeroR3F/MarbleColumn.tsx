"use client";
import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/**
 * Doric marble column:
 * - Cylinder with vertical fluting approximated via radial segments
 * - MeshPhysicalMaterial clearcoat 0.6, marble-like roughness
 * - Single area-light 5500K
 * - 4-second ease-in-out dolly ~2° yaw via useFrame math
 */

function ColumnMesh() {
  const groupRef = React.useRef<THREE.Group>(null!);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      // 4-second ease-in-out oscillation of ~2° (0.0349 rad)
      const t = clock.getElapsedTime();
      const cycle = (t % 4) / 4; // 0→1 in 4s
      const eased = cycle < 0.5
        ? 2 * cycle * cycle
        : 1 - Math.pow(-2 * cycle + 2, 2) / 2;
      groupRef.current.rotation.y = (eased - 0.5) * 0.0698; // ±2°
    }
  });

  // Procedural marble: mix of white + grey
  const marbleMat = new THREE.MeshPhysicalMaterial({
    color: "#E8E0D8",
    roughness: 0.3,
    metalness: 0,
    clearcoat: 0.6,
    clearcoatRoughness: 0.1,
    envMapIntensity: 0.8,
  });

  return (
    <group ref={groupRef}>
      {/* Shaft — 24 radial segments gives slight fluting illusion */}
      <mesh material={marbleMat} castShadow receiveShadow>
        <cylinderGeometry args={[0.45, 0.5, 3.6, 24]} />
      </mesh>
      {/* Capital (top block) */}
      <mesh position={[0, 2.05, 0]} material={marbleMat} castShadow>
        <boxGeometry args={[1.2, 0.3, 1.2]} />
      </mesh>
      {/* Echinus (rounded cap under abacus) */}
      <mesh position={[0, 1.88, 0]} material={marbleMat} castShadow>
        <cylinderGeometry args={[0.65, 0.5, 0.22, 24]} />
      </mesh>
      {/* Base (stylobate) */}
      <mesh position={[0, -1.96, 0]} material={marbleMat} castShadow>
        <cylinderGeometry args={[0.7, 0.7, 0.2, 24]} />
      </mesh>
    </group>
  );
}

interface MarbleColumnProps {
  posterSrc?: string;
}

export default function MarbleColumn({ posterSrc: _posterSrc = "/hero/poster.jpg" }: MarbleColumnProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[#F4F1EA]" />
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 6], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        shadows
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Area-light 5500K (daylight) */}
        <rectAreaLight
          position={[2, 3, 4]}
          rotation={[-Math.PI / 6, Math.PI / 6, 0]}
          intensity={8}
          width={4}
          height={4}
          color="#FFF4E0"
        />
        <ambientLight intensity={0.4} />
        <Environment preset="apartment" />
        <React.Suspense fallback={null}>
          <ColumnMesh />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
