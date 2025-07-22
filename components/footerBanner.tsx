import React from 'react';

export default function FooterBanner() {
  return (
    <section className="relative w-full min-h-[600px] bg-[#033778] overflow-hidden">
      {/* Fondo con SVG */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/footerBackgroud.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      {/* Formas curvas translúcidas superpuestas */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-20 right-10 w-96 h-96 bg-white opacity-15 rounded-full transform rotate-12"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-white opacity-15 rounded-full transform -rotate-6"></div>
        </div>
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[500px]">
          {/* Contenido de texto */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight"
                style={{ 
                  fontFamily: 'Source Sans Pro, sans-serif',
                  fontWeight: 700
                }}
              >
                Are you ready
                <br />
                for the digital tomorrow?
                <br />
                <span className="text-white">better ask ERNI</span>
              </h1>
            </div>
            
            <p 
              className="text-xl md:text-2xl text-white leading-relaxed max-w-2xl"
              style={{ 
                fontFamily: 'Source Sans Pro, sans-serif',
                fontWeight: 400
              }}
            >
              We empower people and businesses through innovation in software-based products and services.
            </p>
          </div>
          
          {/* Botón CTA */}
          <div className="flex justify-end items-end">
            <button 
              className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg"
              style={{ 
                fontFamily: 'Source Sans Pro, sans-serif',
                fontWeight: 600
              }}
            >
              Contact Us →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 