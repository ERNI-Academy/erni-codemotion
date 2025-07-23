'use client';

import { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { CaricatureFeatures, caricaturesData } from '../data/imagesData';
import { CharacterCard } from './index';

interface WhoIsWhoBoardProps {
  activeFilters: CaricatureFeatures[];
}

export default function WhoIsWhoBoard({ activeFilters }: WhoIsWhoBoardProps) {
  // Filtrar las caricaturas basándose en los filtros activos
  const filteredCaricatures = useMemo(() => {
    if (activeFilters.length === 0) {
      return caricaturesData;
    }

    return caricaturesData.filter(caricature => {
      return activeFilters.every(filter => caricature.features[filter] === 1);
    });
  }, [activeFilters]);

  // Crear una matriz de 3x8 para el tablero (24 fichas)
  const boardLayout = useMemo(() => {
    const layout = [];
    const totalCards = Math.min(caricaturesData.length, 24);
    
    for (let row = 0; row < 3; row++) {
      const rowCards = [];
      for (let col = 0; col < 8; col++) {
        const index = row * 8 + col;
        if (index < totalCards) {
          const caricature = caricaturesData[index];
          const isVisible = filteredCaricatures.some(fc => fc.file === caricature.file);
          rowCards.push({
            ...caricature,
            isVisible,
            position: [col * 1.2 - 4.2, row * 1.5 - 1.5, 0]
          });
        }
      }
      layout.push(rowCards);
    }
    
    return layout;
  }, [filteredCaricatures]);

  return (
    <group>
      {/* Tablero base principal */}
      <mesh position={[0, -2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <boxGeometry args={[12, 8, 0.2]} />
        <meshStandardMaterial color="#ff8c00" />
      </mesh>

      {/* Niveles escalonados del tablero */}
      {[0, 1, 2].map((level) => (
        <mesh 
          key={level}
          position={[0, -2 + level * 0.4, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[12, 8, 0.15]} />
          <meshStandardMaterial color="#ff6b00" />
        </mesh>
      ))}

      {/* Bordes laterales del tablero */}
      <mesh position={[-6, -1.5, 0]}>
        <boxGeometry args={[0.3, 3, 8]} />
        <meshStandardMaterial color="#e55a00" />
      </mesh>
      <mesh position={[6, -1.5, 0]}>
        <boxGeometry args={[0.3, 3, 8]} />
        <meshStandardMaterial color="#e55a00" />
      </mesh>

      {/* Fichas de personajes */}
      {boardLayout.map((row, rowIndex) =>
        row.map((card, colIndex) => (
          <CharacterCard
            key={`${rowIndex}-${colIndex}`}
            caricature={card}
            position={card.position as [number, number, number]}
            isVisible={card.isVisible}
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
        position={[0, -3.2, 0]}
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