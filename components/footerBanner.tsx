import React from 'react';

export default function FooterBanner() {
  return (
    <section className="relative w-full py-16 px-12 overflow-hidden h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/footerImage.jpg)'
        }}
      />
      <div 
        className="absolute inset-0 bg-[#033778] opacity-10"
      />
            <div className="relative z-10 px-12 mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 h-full gap-6 lg:gap-0">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <h1 
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight"
              style={{ fontFamily: 'var(--font-source-sans-pro), sans-serif' }}
            >
              Develop your potential and
              <br />
              become an ERNIan.
            </h1>
            
            <div className="space-y-6 lg:space-y-0">
              <p 
                className="hidden lg:block text-base md:text-lg lg:text-xl text-white leading-relaxed max-w-2xl"
                style={{ fontFamily: 'var(--font-source-sans-pro), sans-serif' }}
              >
                We are looking for people like you, eager to grow and who want to
                <br />
                be part of challenging projects to go even further.
              </p>
            </div>
          </div>
          
          <div className="flex lg:flex lg:col-span-3 items-end justify-end">
            <a
              href="https://www.betterask.erni/es-en/job-opportunities/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center justify-center min-w-[280px] whitespace-nowrap"
              style={{ fontFamily: 'var(--font-source-sans-pro), sans-serif' }}
            >
              View available opportunities →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 