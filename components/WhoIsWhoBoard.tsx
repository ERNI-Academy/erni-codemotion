'use client';

import { useMemo } from 'react';
import { Text } from '@react-three/drei';
import { CaricatureFeatures, caricaturesData } from '../data/imagesData';
import { CharacterCard } from './index';

interface WhoIsWhoBoardProps {
  activeFilters: CaricatureFeatures[];
  onCardClick?: (caricature: { file: string; features: number[] }) => void;
}

export default function WhoIsWhoBoard({ activeFilters, onCardClick }: WhoIsWhoBoardProps) {
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
            position: [col * 1.2 - 4.2, 0, row * 1.2 - 2] // X: columna, Y: altura (0 = tocando el tablero), Z: profundidad (delante hacia atrás)
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
        <boxGeometry args={[12, 25, 0.2]} />
        <meshStandardMaterial color="#ff8c00" />
      </mesh>

      {/* Niveles escalonados del tablero */}
      {[0, 1, 2, 3, 4, 5].map((level) => (
        <mesh 
          key={level}
          position={[0, -2 + level * 0.4, 0]} 
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <boxGeometry args={[12, 25, 0.15]} />
          <meshStandardMaterial color="#ff6b00" />
        </mesh>
      ))}

      {/* Bordes laterales del tablero */}
      <mesh position={[-6, -1.5, 0]}>
        <boxGeometry args={[0.3, 6, 25]} />
        <meshStandardMaterial color="#e55a00" />
      </mesh>
      <mesh position={[6, -1.5, 0]}>
        <boxGeometry args={[0.3, 6, 25]} />
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
        position={[0, -4, -12]}
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