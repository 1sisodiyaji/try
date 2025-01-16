"use client";

import React, { useEffect, useRef } from "react";
import { useGLTF, useScroll, useTexture } from "@react-three/drei";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

type GLTFResult = {
  nodes: {
    [key: string]: THREE.Mesh;
  };
  materials: {
    [key: string]: THREE.Material;
  };
  scene: THREE.Group;
};

interface MeshDictionary {
  [key: string]: THREE.Object3D;
  screen: THREE.Mesh;
  matte: THREE.Mesh & {
    material: THREE.MeshStandardMaterial;
  };
}

const MacContainer: React.FC = () => {
  const model = useGLTF("/media/images/mac.glb") as unknown as GLTFResult;
  const tex = useTexture("/media/images/opensource.png");
  const meshesRef = useRef<MeshDictionary>({} as MeshDictionary);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    // Initialize scene traversal
    model.scene.traverse((e: THREE.Object3D) => {
      meshesRef.current[e.name] = e;
    });

    // Initial screen rotation
    if (meshesRef.current.screen) {
      meshesRef.current.screen.rotation.x = THREE.MathUtils.degToRad(180);
    }

    // Set up matte material
    if (meshesRef.current.matte) {
      meshesRef.current.matte.material.map = tex;
      meshesRef.current.matte.material.emissiveIntensity = 0;
      meshesRef.current.matte.material.metalness = 0;
      meshesRef.current.matte.material.roughness = 1;
    }

    // Set initial tilt
    if (groupRef.current) {
      groupRef.current.rotation.x = THREE.MathUtils.degToRad(15); // 15 degree tilt
      groupRef.current.rotation.y = THREE.MathUtils.degToRad(20); // 20 degree rotation
    }
  }, [model.scene, tex]);

  const data = useScroll();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  useFrame((_state, _delta) => {
    const scrollProgress = data.offset;
    
    // Handle group (entire MacBook) rotations
    if (groupRef.current) {
      // Straighten the MacBook during the first half of the scroll
      if (scrollProgress <= 0.5) {
        const normalizedProgress = scrollProgress * 2; // Convert 0-0.5 to 0-1
        groupRef.current.rotation.x = THREE.MathUtils.degToRad(15 * (1 - normalizedProgress));
        groupRef.current.rotation.y = THREE.MathUtils.degToRad(20 * (1 - normalizedProgress));
      } else {
        // Keep it straight after halfway point
        groupRef.current.rotation.x = 0;
        groupRef.current.rotation.y = 0;
      }
    }

    // Handle screen (lid) rotation
    if (meshesRef.current.screen) {
      if (scrollProgress > 0.5) {
        // Open lid during second half of scroll
        const normalizedProgress = (scrollProgress - 0.5) * 2; // Convert 0.5-1 to 0-1
        const lidAngle = 180 - (normalizedProgress * 90); // 180 to 90 degrees
        meshesRef.current.screen.rotation.x = THREE.MathUtils.degToRad(lidAngle);
      } else {
        // Keep lid closed during first half
        meshesRef.current.screen.rotation.x = THREE.MathUtils.degToRad(180);
      }
    }
  });

  return (
    <group ref={groupRef} position={[0, -14, 20]}>
      <primitive object={model.scene} />
    </group>
  );
};

useGLTF.preload("/media/images/mac.glb");

export default MacContainer;