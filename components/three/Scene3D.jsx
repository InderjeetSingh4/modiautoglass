"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows } from "@react-three/drei";
import CarModel from "./CarModel";

/**
 * Scene3D — Soft Studio Lighting & Pastel Rim Lights (Purple / Pink / Cyan)
 * Optimized for White Claymorphism XUV700 Aesthetic with 0 network HDRI dependencies.
 */
export default function Scene3D({ scrollProgress = 0 }) {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 2.0, 8.8], fov: 40 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        {/* Soft Studio Ambient Lighting */}
        <ambientLight intensity={1.1} />

        {/* Primary Soft Key Light (Front Top) */}
        <directionalLight
          position={[4, 10, 6]}
          intensity={1.4}
          color="#FAFAFA"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />

        {/* Soft Pink / Magenta Rim Light (Right Edge Accent) */}
        <spotLight
          position={[8, 5, -4]}
          intensity={3.5}
          color="#E879F9"
          angle={0.65}
          penumbra={0.9}
        />
        <pointLight position={[6, 3, -5]} intensity={2.5} color="#C084FC" />

        {/* Soft Electric Blue / Cyan Rim Light (Left Edge Accent) */}
        <spotLight
          position={[-8, 6, -3]}
          intensity={3.2}
          color="#38BDF8"
          angle={0.7}
          penumbra={0.9}
        />
        <pointLight position={[-5, -1, 3]} intensity={1.8} color="#818CF8" />

        {/* Glass Specular Highlighting */}
        <directionalLight
          position={[0, 8, -6]}
          intensity={0.9}
          color="#E0F2FE"
        />

        <Suspense fallback={null}>
          {/* White Claymorphism XUV700 SUV */}
          <CarModel scrollProgress={scrollProgress} />

          {/* Soft Ground Contact Shadow */}
          <ContactShadows
            position={[0, -1.5, 0]}
            opacity={0.25}
            scale={16}
            blur={2.6}
            far={6}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
