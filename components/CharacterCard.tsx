'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

interface CharacterCardProps {
  caricature: {
    file: string;
    features: number[];
    isVisible: boolean;
  };
  position: [number, number, number];
  isVisible: boolean;
}

export default function CharacterCard({ caricature, position, isVisible }: CharacterCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef(0);
  const currentRotation = useRef(0);

  // Cargar la textura usando el hook de drei
  const texture = useTexture(`/caricatures/${caricature.file}`);

  // Actualizar la rotación objetivo cuando cambia la visibilidad
  useEffect(() => {
    targetRotation.current = isVisible ? 0 : Math.PI;
  }, [isVisible]);

  // Animación suave de rotación
  useFrame((state, delta) => {
    if (meshRef.current) {
      const diff = targetRotation.current - currentRotation.current;
      if (Math.abs(diff) > 0.01) {
        currentRotation.current += diff * delta * 3; // Velocidad de animación
        meshRef.current.rotation.x = currentRotation.current;
      }
    }
  });

  return (
    <group position={position}>
      {/* Marco de la ficha */}
      <mesh ref={meshRef} position={[0, 0, 0.05]}>
        <boxGeometry args={[1, 1.2, 0.1]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>

      {/* Imagen del personaje */}
      <mesh position={[0, 0.1, 0.1]}>
        <planeGeometry args={[0.8, 0.8]} />
        <meshStandardMaterial map={texture} />
      </mesh>

      {/* Nombre del personaje */}
      <Text
        position={[0, -0.4, 0.1]}
        fontSize={0.08}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {caricature.file.replace('.png', '')}
      </Text>

      {/* Bisagra en la parte inferior */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 1.2, 8]} />
        <meshStandardMaterial color="#666" />
      </mesh>
    </group>
  );
} 