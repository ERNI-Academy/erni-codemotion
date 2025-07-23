'use client';

import { useRef } from 'react';
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
  onCardClick?: (caricature: { file: string; features: number[] }) => void;
}

export default function CharacterCard({ caricature, position, isVisible, onCardClick }: CharacterCardProps) {
  const groupRef = useRef<THREE.Group>(null);

  // Cargar la textura usando el hook de drei
  const texture = useTexture(`/caricatures/${caricature.file}`);

  // Si no es visible, no renderizar nada
  if (!isVisible) {
    return null;
  }

  return (
    <group position={position}>
      {/* Grupo que contiene el marco, imagen y texto - todo se desliza junto */}
      <group 
        ref={groupRef} 
        position={[0, 0, 0.05]}
        userData={{ isCard: true, cardId: caricature.file }}
      >
        {/* Marco de la ficha */}
        <mesh>
          <boxGeometry args={[1, 1.2, 0.1]} />
          <meshStandardMaterial color="#ffffff" />
        </mesh>

        {/* Imagen del personaje - anclada al frente del marco */}
        <mesh position={[0, 0.1, 0.05]}>
          <planeGeometry args={[0.8, 0.8]} />
          <meshStandardMaterial map={texture} side={THREE.FrontSide} />
        </mesh>

        {/* Nombre del personaje - anclado al frente del marco */}
        <Text
          position={[0, -0.4, 0.05]}
          fontSize={0.08}
          color="#333"
          anchorX="center"
          anchorY="middle"
        >
          {caricature.file.replace('.png', '')}
        </Text>
      </group>

      {/* Bisagra en la parte inferior - no rota */}
      <mesh position={[0, -0.6, 0]}>
        <meshStandardMaterial color="#666" />
      </mesh>
    </group>
  );
} 