"use client";
import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function ToothGeometry() {
  const meshRef = React.useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // 0.15rpm → 0.15/60 * 2π rad/s ≈ 0.01571 rad/s
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.01571 * 60 * (0.15 / 60) * Math.PI * 2;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
      {/* Upper-incisor approximation: squarish cylinder, taller than wide */}
      <cylinderGeometry args={[0.55, 0.65, 1.8, 6, 4]} />
      <MeshDistortMaterial
        color="#FFE9E0"
        roughness={0.08}
        metalness={0}
        transmission={0.4}
        thickness={1.2}
        ior={1.62}
        attenuationColor="#FFE9E0"
        attenuationDistance={0.6}
        distort={0.05}
        speed={0.4}
        envMapIntensity={1.2}
      />
    </mesh>
  );
}

interface ToothMeshProps {
  posterSrc?: string;
}

export default function ToothMesh({ posterSrc: _posterSrc = "/hero/poster.jpg" }: ToothMeshProps) {
  return (
    <div className="absolute inset-0 -z-10">
      {/* Dark warmth background */}
      <div className="absolute inset-0 bg-[#1F1A14]" />
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        <ambientLight intensity={0.3} />
        {/* Key light — camera-left 35°, 4200K warm */}
        <pointLight position={[-2, 1.5, 3]} intensity={3} color="#FFD580" />
        {/* Dental loupe fill — soft below */}
        <pointLight position={[0, -2, 2]} intensity={1.2} color="#FFF5E0" />
        <Environment preset="studio" />
        <React.Suspense fallback={null}>
          <ToothGeometry />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
