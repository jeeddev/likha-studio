"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense } from "react";
import Shoe from "./Shoe";

export default function Experience() {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={2.2} />
        <directionalLight position={[-5, 3, -5]} intensity={0.9} color="#3d5afe" />

        {/* tagiliran ang harap, nasa kanan, steady */}
        <group position={[1.6, 0.1, 0]} rotation={[0, Math.PI / 2, 0]}>
          <Shoe autoRotate={false} />
        </group>

        <ContactShadows
          position={[1.6, -1.3, 0]}
          opacity={0.8}
          scale={7}
          blur={2.4}
          far={4}
          color="#000000"
        />

        <Environment preset="city" />

        <EffectComposer>
          <Bloom mipmapBlur intensity={0.5} luminanceThreshold={0.85} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  );
}