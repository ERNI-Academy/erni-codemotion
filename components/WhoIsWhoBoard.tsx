'use client';

import { useMemo, useRef } from 'react';
import { Text } from '@react-three/drei';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CaricatureFeatures, caricaturesData } from '../data/imagesData';
import { CharacterCard } from './index';

interface WhoIsWhoBoardProps {
  activeFilters: CaricatureFeatures[];
  onCardClick?: (caricature: { file: string; features: number[] }) => void;
}

export default function WhoIsWhoBoard({ activeFilters, onCardClick }: WhoIsWhoBoardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { camera, gl } = useThree();

  // Manejador de clics global con raycasting
  const handleGlobalClick = (event: any) => {
    if (!onCardClick) return;

    const rect = gl.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2();
    
    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);
    
    if (groupRef.current) {
      const intersects = raycaster.intersectObjects(groupRef.current.children, true);
      
      if (intersects.length > 0) {
        const firstIntersection = intersects[0];
        const cardGroup = firstIntersection.object.userData?.isCard ? 
          firstIntersection.object : 
          firstIntersection.object.parent?.userData?.isCard ? 
            firstIntersection.object.parent : null;
        
        if (cardGroup && cardGroup.userData?.cardId) {
          const cardData = caricaturesData.find(card => card.file === cardGroup.userData.cardId);
          if (cardData) {
            onCardClick(cardData);
          }
        }
      }
    }
  };

  // Filtrar las caricaturas basándose en los filtros activos
  const filteredCaricatures = useMemo(() => {
    if (activeFilters.length === 0) {
      return caricaturesData;
    }

    return caricaturesData.filter(caricature => {
      return activeFilters.every(filter => caricature.features[filter] === 1);
    });
  }, [activeFilters]);

  // Crear una matriz que ocupe todo el tablero de delante hacia atrás
  const boardLayout = useMemo(() => {
    const cardsPerRow = 8;
    const totalCards = caricaturesData.length;
    const totalRows = Math.ceil(totalCards / cardsPerRow);
    const layout = [];
    
    // Dimensiones del tablero: 12 de ancho, 25 de profundidad
    const boardWidth = 12;
    const boardDepth = 25;
    const cardSpacingX = boardWidth / cardsPerRow; // 1.5 unidades entre columnas
    const cardSpacingZ = boardDepth / totalRows; // Espaciado vertical basado en el número de filas
    
    for (let row = 0; row < totalRows; row++) {
      const rowCards = [];
      for (let col = 0; col < cardsPerRow; col++) {
        const index = row * cardsPerRow + col;
        if (index < totalCards) {
          const caricature = caricaturesData[index];
          const isVisible = filteredCaricatures.some(fc => fc.file === caricature.file);
          rowCards.push({
            ...caricature,
            isVisible,
            position: [
              col * cardSpacingX - (boardWidth / 2) + (cardSpacingX / 2), // X: centrado en el tablero
              0.6, // Y: elevado para ser completamente visible
              row * cardSpacingZ - (boardDepth / 2) + (cardSpacingZ / 2) // Z: centrado en profundidad
            ]
          });
        }
      }
      layout.push(rowCards);
    }
    
    return layout;
  }, [filteredCaricatures]);

  return (
    <group ref={groupRef} onClick={handleGlobalClick}>
      {/* Tablero base principal */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[12, 25, 0.2]} />
        <meshStandardMaterial color="#033778" />
      </mesh>

      {/* Niveles escalonados del tablero */}
      {[0, 1, 2, 3, 4, 5].map((level) => (
        <mesh 
          key={level}
          position={[0, -2 + level * 0.4, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[12, 25, 0.15]} />
          <meshStandardMaterial color="#033778" />
        </mesh>
      ))}

      {/* Bordes laterales del tablero */}
      <mesh position={[-6, -1.5, 0]}>
        <boxGeometry args={[0.3, 6, 25]} />
        <meshStandardMaterial color="#033778" />
      </mesh>
      <mesh position={[6, -1.5, 0]}>
        <boxGeometry args={[0.3, 6, 25]} />
        <meshStandardMaterial color="#033778" />
      </mesh>

      {/* Fichas de personajes */}
      {boardLayout.map((row, rowIndex) =>
        row.map((card, colIndex) => (
          <CharacterCard
            key={`${rowIndex}-${colIndex}`}
            caricature={card}
            position={card.position as [number, number, number]}
            isVisible={card.isVisible}
            onCardClick={onCardClick}
          />
        ))
      )}

      {/* Slots vacíos en la parte inferior */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh
          key={`slot-${i}`}
          position={[i * 1.2 - 5.4, -2.8, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[1, 0.8, 0.05]} />
          <meshStandardMaterial color="#e55a00" />
        </mesh>
      ))}

      {/* Texto del juego en el frente */}
      <Text
        position={[0, -4, -12.5]}
        fontSize={0.3}
        color="#fff"
        anchorX="center"
        anchorY="middle"
      >
        GUESS WHO?
      </Text>
    </group>
  );
} 