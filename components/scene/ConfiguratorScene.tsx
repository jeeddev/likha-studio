"use client";

import { Canvas } from "@react-three/fiber";
import {
  Environment,
  PresentationControls,
  ContactShadows,
} from "@react-three/drei";
import { Suspense } from "react";
import Shoe from "./Shoe";

export default function ConfiguratorScene({ color }: { color: string }) {
  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 35 }} dpr={[1, 2]}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={2} />
        <directionalLight position={[-5, 2, -3]} intensity={0.8} />

        <PresentationControls
          global
          polar={[-Math.PI, Math.PI]}
          azimuth={[-Infinity, Infinity]}
        >
          <Shoe color={color} autoRotate={false} />
        </PresentationControls>

        <ContactShadows position={[0, -1.5, 0]} opacity={0.4} blur={2.5} far={4} />
        <Environment preset="studio" />
      </Suspense>
    </Canvas>
  );
}