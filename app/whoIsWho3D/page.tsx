'use client';

import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { WhoIsWhoBoard, FilterButtons } from '../../components';
import { CaricatureFeatures } from '../../data/imagesData';

export default function WhoIsWho3DPage() {
  const [activeFilters, setActiveFilters] = useState<CaricatureFeatures[]>([]);

  const handleFilterToggle = (filter: CaricatureFeatures) => {
    setActiveFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter)
        : [...prev, filter]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 to-orange-600">
      {/* Header con filtros */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-white text-center mb-4">
            ¿Quién es Quién? 3D
          </h1>
          <FilterButtons 
            activeFilters={activeFilters}
            onFilterToggle={handleFilterToggle}
          />
        </div>
      </div>

      {/* Canvas 3D */}
      <div className="w-full h-screen">
        <Canvas
          camera={{ position: [0, 5, 8], fov: 50 }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <WhoIsWhoBoard activeFilters={activeFilters} />
          
          <OrbitControls 
            enablePan={false}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minDistance={5}
            maxDistance={15}
          />
        </Canvas>
      </div>
    </div>
  );
} 