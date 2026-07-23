"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * CarModel — White Claymorphism XUV700 SUV
 *
 * Aesthetic: Soft-matte white clay body finish paired with high-gloss transparent glass,
 * modeled after an XUV700 SUV silhouette (bold front grille, dual LED DRL accents,
 * sculpted hood, roof rails, high stance).
 */
export default function CarModel({ scrollProgress = 0 }) {
  const groupRef = useRef();

  // Claymorphism & Glossy Glass Materials
  const materials = useMemo(() => {
    // Soft-matte white clay body
    const bodyMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#F3F4F6"),
      roughness: 0.78,
      metalness: 0.04,
      clearcoat: 0.0,
      envMapIntensity: 0.4,
    });

    // High-contrast glossy transparent glass
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#60A5FA"),
      metalness: 0.02,
      roughness: 0.03,
      transmission: 0.96,
      thickness: 0.65,
      envMapIntensity: 2.2,
      ior: 1.52,
      transparent: true,
      opacity: 0.42,
    });

    // Soft matte dark clay for trim/tires
    const trimMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#374151"),
      roughness: 0.85,
      metalness: 0.1,
    });

    // Satin silver clay for wheels & grille
    const accentMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#E5E7EB"),
      roughness: 0.45,
      metalness: 0.25,
    });

    // LED Headlight DRL accents (soft glow)
    const headlightMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#FFFFFF"),
      emissive: new THREE.Color("#38BDF8"),
      emissiveIntensity: 0.8,
    });

    // Taillight accents
    const taillightMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#EF4444"),
      emissive: new THREE.Color("#F87171"),
      emissiveIntensity: 0.6,
    });

    return { bodyMat, glassMat, trimMat, accentMat, headlightMat, taillightMat };
  }, []);

  // Scroll-linked smooth rotation & position keyframes
  useFrame(() => {
    if (!groupRef.current) return;

    const t = scrollProgress;

    // 0.0 -> Stylized Front-Quarter View
    // 0.3 -> Pans to highlight Windshield & Side Windows
    // 0.7 -> Side-rear profile
    // 1.0 -> Complete front zoom-out
    const rotationY = THREE.MathUtils.lerp(
      -Math.PI * 0.22,
      Math.PI * 1.82,
      t
    );
    groupRef.current.rotation.y = rotationY;

    // Gentle float
    groupRef.current.position.y = Math.sin(t * Math.PI * 2) * 0.05 - 1.5;

    // Scale
    const scale = 0.75 - Math.sin(t * Math.PI) * 0.04;
    groupRef.current.scale.setScalar(scale);

    // Subtle pitch
    groupRef.current.rotation.x = Math.sin(t * Math.PI) * 0.03;
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]} scale={0.75}>
      {/* === XUV700 SUV BODY (Claymorphism White) === */}

      {/* Main SUV Chassis */}
      <mesh material={materials.bodyMat} position={[0, 0.6, 0]}>
        <boxGeometry args={[4.4, 0.8, 2.0]} />
      </mesh>

      {/* Underbody Protective Skirt */}
      <mesh material={materials.trimMat} position={[0, 0.22, 0]}>
        <boxGeometry args={[4.25, 0.2, 1.96]} />
      </mesh>

      {/* Upper Cabin (XUV700 High Roofline) */}
      <mesh material={materials.bodyMat} position={[0.05, 1.22, 0]}>
        <boxGeometry args={[2.55, 0.72, 1.82]} />
      </mesh>

      {/* Slanted Front Hood (Sculpted SUV Bonnet) */}
      <mesh
        material={materials.bodyMat}
        position={[-1.65, 0.68, 0]}
        rotation={[0, 0, 0.08]}
      >
        <boxGeometry args={[1.3, 0.46, 1.94]} />
      </mesh>

      {/* A-Pillar Slope */}
      <mesh
        material={materials.bodyMat}
        position={[-0.95, 1.15, 0]}
        rotation={[0, 0, 0.35]}
      >
        <boxGeometry args={[0.85, 0.62, 1.8]} />
      </mesh>

      {/* D-Pillar / SUV Rear Roof */}
      <mesh
        material={materials.bodyMat}
        position={[1.15, 1.15, 0]}
        rotation={[0, 0, -0.18]}
      >
        <boxGeometry args={[0.65, 0.62, 1.8]} />
      </mesh>

      {/* Rear SUV Tailgate */}
      <mesh material={materials.bodyMat} position={[1.72, 0.72, 0]}>
        <boxGeometry args={[0.95, 0.52, 1.92]} />
      </mesh>

      {/* Front SUV Bumper */}
      <mesh material={materials.trimMat} position={[-2.25, 0.42, 0]}>
        <boxGeometry args={[0.15, 0.52, 1.96]} />
      </mesh>

      {/* Rear SUV Bumper */}
      <mesh material={materials.trimMat} position={[2.22, 0.42, 0]}>
        <boxGeometry args={[0.15, 0.52, 1.96]} />
      </mesh>

      {/* Roof Rails (XUV700 Signature Style) */}
      <mesh material={materials.trimMat} position={[0.1, 1.62, 0.86]}>
        <boxGeometry args={[2.2, 0.06, 0.08]} />
      </mesh>
      <mesh material={materials.trimMat} position={[0.1, 1.62, -0.86]}>
        <boxGeometry args={[2.2, 0.06, 0.08]} />
      </mesh>

      {/* XUV700 Signature Grille */}
      <mesh material={materials.accentMat} position={[-2.27, 0.58, 0]}>
        <boxGeometry args={[0.04, 0.3, 1.3]} />
      </mesh>

      {/* === HIGH-GLOSS TRANSPARENT AUTO GLASS === */}

      {/* Windshield */}
      <mesh
        material={materials.glassMat}
        position={[-0.72, 1.25, 0]}
        rotation={[0, 0, 0.48]}
      >
        <planeGeometry args={[1.05, 1.7]} />
      </mesh>

      {/* Sunroof Glass */}
      <mesh
        material={materials.glassMat}
        position={[0.1, 1.59, 0]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[1.6, 1.2]} />
      </mesh>

      {/* Rear Windshield */}
      <mesh
        material={materials.glassMat}
        position={[1.28, 1.22, 0]}
        rotation={[0, 0, -0.32]}
      >
        <planeGeometry args={[0.75, 1.65]} />
      </mesh>

      {/* Side Windows - Left */}
      <mesh
        material={materials.glassMat}
        position={[0.1, 1.24, 0.92]}
        rotation={[Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2.1, 0.56]} />
      </mesh>

      {/* Side Windows - Right */}
      <mesh
        material={materials.glassMat}
        position={[0.1, 1.24, -0.92]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[2.1, 0.56]} />
      </mesh>

      {/* === SUV WHEELS & WHEEL ARCHES === */}
      {[
        [-1.4, 0.08, 1.05],
        [-1.4, 0.08, -1.05],
        [1.4, 0.08, 1.05],
        [1.4, 0.08, -1.05],
      ].map((pos, i) => (
        <group key={i} position={pos}>
          {/* Wheel Arch Overfender */}
          <mesh
            material={materials.trimMat}
            position={[0, 0.35, 0]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <torusGeometry args={[0.38, 0.08, 8, 16, Math.PI]} />
          </mesh>
          {/* Tire */}
          <mesh material={materials.trimMat} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.32, 0.14, 16, 28]} />
          </mesh>
          {/* Rim */}
          <mesh material={materials.accentMat} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.22, 0.22, 0.16, 16]} />
          </mesh>
        </group>
      ))}

      {/* === LIGHTS (XUV700 C-Shaped DRLs) === */}
      <mesh material={materials.headlightMat} position={[-2.23, 0.62, 0.65]}>
        <boxGeometry args={[0.06, 0.22, 0.38]} />
      </mesh>
      <mesh material={materials.headlightMat} position={[-2.23, 0.62, -0.65]}>
        <boxGeometry args={[0.06, 0.22, 0.38]} />
      </mesh>

      {/* Taillights */}
      <mesh material={materials.taillightMat} position={[2.22, 0.62, 0.7]}>
        <boxGeometry args={[0.06, 0.18, 0.35]} />
      </mesh>
      <mesh material={materials.taillightMat} position={[2.22, 0.62, -0.7]}>
        <boxGeometry args={[0.06, 0.18, 0.35]} />
      </mesh>
    </group>
  );
}
