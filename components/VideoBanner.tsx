import React from 'react';

export default function VideoBanner() {
  return (
    <div className="w-full h-[75vh] relative overflow-hidden">
      <iframe
        src="https://www.youtube.com/embed/SjGNT0ptT9Y?autoplay=1&mute=1&loop=1&playlist=SjGNT0ptT9Y&controls=0&showinfo=0&rel=0&modestbranding=1"
        className="w-full h-full border-0 absolute top-0 left-0 object-cover"
        style={{
          transform: 'scale(1.6)',
          transformOrigin: 'center center'
        }}
        title="Video Banner"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
      <div
        className="absolute top-0 left-0 w-full h-full pointer-events-auto z-[1]"
        style={{
          backgroundColor: '#033778',
          opacity: 0.3
        }}
      />
      <div
        className="absolute left-0 bottom-0 w-full flex items-end z-[2]"
      >
        <h1
          className="text-white text-5xl md:text-7xl font-semibold pl-8 pb-8"
          style={{ 
            lineHeight: 1.1,
            fontFamily: 'Source Sans Pro, sans-serif',
            fontWeight: 600
          }}
        >
          ERNI<br />Swiss software<br /> engineering
        </h1>
      </div>
    </div>
  );
} 