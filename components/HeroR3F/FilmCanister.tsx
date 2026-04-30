"use client";
import * as React from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import * as THREE from "three";

/**
 * Hasselblad-style medium-format film canister:
 * - Brushed-aluminum body: MeshPhysicalMaterial roughness 0.18, anisotropy 0.6
 * - Kodak Portra 400 decal via canvas texture
 * - Two-tone lighting: warm rim 3200K + cool fill 5800K
 * - 0.1rpm tumble on X+Y combined
 */

function createDecalTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  // Kodak yellow background band
  ctx.fillStyle = "#F5C800";
  ctx.fillRect(0, 0, 512, 256);

  // Red block
  ctx.fillStyle = "#E3001B";
  ctx.fillRect(0, 0, 160, 256);

  // White text area
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(160, 20, 352, 216);

  // KODAK label
  ctx.fillStyle = "#E3001B";
  ctx.font = "bold 56px Arial, sans-serif";
  ctx.fillText("KODAK", 175, 90);

  // PORTRA 400
  ctx.fillStyle = "#222222";
  ctx.font = "bold 38px Arial, sans-serif";
  ctx.fillText("PORTRA 400", 175, 145);

  // Film speed indicator
  ctx.fillStyle = "#555555";
  ctx.font = "22px Arial, sans-serif";
  ctx.fillText("135 — 36 exp.", 175, 195);

  return new THREE.CanvasTexture(canvas);
}

function CanisterMesh() {
  const meshRef = React.useRef<THREE.Group>(null!);
  const [decalTex, setDecalTex] = React.useState<THREE.CanvasTexture | null>(null);

  React.useEffect(() => {
    setDecalTex(createDecalTexture());
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      // 0.1rpm = 0.01047 rad/s
      const t = clock.getElapsedTime() * 0.01047 * 60 * (0.1 / 60) * Math.PI * 2;
      meshRef.current.rotation.x = t * 0.4;
      meshRef.current.rotation.y = t;
    }
  });

  const bodyMat = new THREE.MeshPhysicalMaterial({
    color: "#B8B8B8",
    roughness: 0.18,
    metalness: 0.85,
    anisotropy: 0.6,
    envMapIntensity: 1.5,
  });

  return (
    <group ref={meshRef}>
      {/* Main canister body */}
      <mesh material={bodyMat} castShadow>
        <cylinderGeometry args={[0.6, 0.6, 2.2, 32]} />
      </mesh>
      {/* Top cap */}
      <mesh position={[0, 1.1, 0]} material={bodyMat} castShadow>
        <cylinderGeometry args={[0.65, 0.6, 0.12, 32]} />
      </mesh>
      {/* Bottom cap */}
      <mesh position={[0, -1.1, 0]} material={bodyMat} castShadow>
        <cylinderGeometry args={[0.6, 0.65, 0.12, 32]} />
      </mesh>
      {/* Decal band */}
      {decalTex && (
        <mesh position={[0, 0, 0]} castShadow>
          <cylinderGeometry args={[0.62, 0.62, 1.6, 32]} />
          <meshBasicMaterial map={decalTex} transparent />
        </mesh>
      )}
    </group>
  );
}

interface FilmCanisterProps {
  posterSrc?: string;
}

export default function FilmCanister({ posterSrc: _posterSrc = "/hero/poster.jpg" }: FilmCanisterProps) {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[#0E0C0A]" />
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        style={{ position: "absolute", inset: 0 }}
      >
        {/* Warm rim — camera-back-right, 3200K */}
        <pointLight position={[3, 1, -2]} intensity={4} color="#FF8C30" />
        {/* Cool fill — camera-left, 5800K */}
        <pointLight position={[-2, 0, 3]} intensity={0.8} color="#B0C8FF" />
        <ambientLight intensity={0.15} />
        <Environment preset="night" />
        <React.Suspense fallback={null}>
          <CanisterMesh />
        </React.Suspense>
      </Canvas>
    </div>
  );
}
