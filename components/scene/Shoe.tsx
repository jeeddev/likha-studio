"use client";

import { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";
import type { Group } from "three";

useGLTF.preload("/models/shoe.glb");

export default function Shoe({
  color = "#ffffff",
  autoRotate = true,
}: {
  color?: string;
  autoRotate?: boolean;
}) {
  const ref = useRef<Group>(null);
  const { scene } = useGLTF("/models/shoe.glb");

  // sariling kopya para hindi magkagulo ang hero at configurator
  const cloned = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      if (Array.isArray(mesh.material)) {
        mesh.material = mesh.material.map((m) => m.clone());
      } else if (mesh.material) {
        mesh.material = (mesh.material as THREE.Material).clone();
      }
    });
    return clone;
  }, [scene]);

  // tint sa ibabaw ng texture
  useEffect(() => {
    cloned.traverse((child) => {
      const mesh = child as THREE.Mesh;
      if (!mesh.isMesh) return;
      const setColor = (m: THREE.Material) => {
        const mat = m as THREE.MeshStandardMaterial;
        if (mat.color) mat.color.set(color);
      };
      if (Array.isArray(mesh.material)) mesh.material.forEach(setColor);
      else if (mesh.material) setColor(mesh.material);
    });
  }, [cloned, color]);

  useFrame((_, delta) => {
    if (autoRotate && ref.current) ref.current.rotation.y += delta * 0.3;
  });

  return (
    <group ref={ref} scale={0.06}>
      <Center>
        <primitive object={cloned} />
      </Center>
    </group>
  );
}