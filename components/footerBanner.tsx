import React from 'react';

export default function FooterBanner() {
  return (
    <section className="relative w-full py-16 px-8 bg-[#033778] overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/footerBackgroud.svg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-1/2 h-full">
          <div className="absolute top-20 right-10 w-96 h-96 bg-white opacity-15 rounded-full transform rotate-12"></div>
          <div className="absolute top-40 right-20 w-80 h-80 bg-white opacity-15 rounded-full transform -rotate-6"></div>
        </div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-end">
          <div className="space-y-7 lg:col-span-3">
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
          
          <div className="flex justify-end lg:col-span-1">
            <a
              href="https://www.betterask.erni/es-en/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-12 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center justify-center"
              style={{ 
                fontFamily: 'Source Sans Pro, sans-serif',
                fontWeight: 600,
                minWidth: '200px'
              }}
            >
              Contact Us →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 