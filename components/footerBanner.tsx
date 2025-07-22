import React from 'react';

export default function FooterBanner() {
  return (
    <section className="relative w-full py-16 px-12 overflow-hidden h-[600px]">
      <div 
        className="absolute inset-0 bg-cover bg-center mx-12"
        style={{
          backgroundImage: 'url(/footerPicture.jpg)'
        }}
      />
      <div 
        className="absolute inset-0 mx-12 bg-[#033778] opacity-30"
      />
            <div className="relative z-10 px-12 mx-auto h-full">
        <div className="grid grid-cols-1 lg:grid-cols-10 h-full gap-6 lg:gap-0">
          <div className="lg:col-span-7 flex flex-col justify-between">
            <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight font-['Source_Sans_Pro']">
              Desarrolla tu potencial y
              <br />
              conviértete en un ERNIan.
            </h1>
            
            <div className="space-y-6 lg:space-y-0">
              <p className="text-base md:text-lg lg:text-xl text-white leading-relaxed max-w-2xl font-['Source_Sans_Pro']">
                Buscamos personas como tú, con ganas de crecer y que quieran
                <br />
                formar parte de proyectos retadores para llegar aún más lejos.
              </p>
              
              <div className="flex justify-start lg:hidden">
                <a
                  href="https://www.betterask.erni/es-en/contact-us/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-6 md:px-8 py-3 rounded-full font-semibold text-base md:text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center justify-center min-w-[200px] md:min-w-[280px] font-['Source_Sans_Pro'] whitespace-nowrap"
                >
                  Ver oportunidades disponibles →
                </a>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:flex lg:col-span-3 items-end justify-end">
            <a
              href="https://www.betterask.erni/es-en/contact-us/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold text-lg hover:bg-gray-100 transition-colors duration-300 shadow-lg flex items-center justify-center min-w-[280px] font-['Source_Sans_Pro'] whitespace-nowrap"
            >
              Ver oportunidades disponibles →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
} 