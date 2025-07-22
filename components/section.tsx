import React from 'react';

interface SectionProps {
  title: string;
  paragraph1: string;
  paragraph2: string;
  buttonText: string;
  buttonLink: string;
  imageSrc: string;
  imageAlt: string;
  imagePosition?: 'left' | 'right';
}

export default function Section({
  title,
  paragraph1,
  paragraph2,
  buttonText,
  buttonLink,
  imageSrc,
  imageAlt,
  imagePosition = 'right'
}: SectionProps) {
  const TextContent = () => (
    <div className="space-y-6">
      <h2 
        className="text-4xl md:text-5xl font-semibold text-[#033778] leading-tight"
        style={{ 
          fontFamily: 'var(--font-source-sans-pro), sans-serif',
          fontWeight: 600
        }}
      >
        {title}
      </h2>
      
      <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
        <p>{paragraph1}</p>
        <p>{paragraph2}</p>
      </div>
      
      <a
        href={buttonLink}
        className="inline-block bg-[#033778] text-white px-8 py-3 rounded-full font-semibold text-lg hover:bg-[#022a5e] transition-colors duration-300"
        style={{ 
          fontFamily: 'var(--font-source-sans-pro), sans-serif',
          fontWeight: 600
        }}
      >
        {buttonText}
      </a>
    </div>
  );

  const ImageContent = () => (
    <div className="relative">
      <div className="relative overflow-hidden rounded-lg shadow-lg">
        <img
          src={imageSrc}
          alt={imageAlt}
          className="w-full h-auto object-cover"
        />
      </div>
    </div>
  );

  return (
    <section className="w-full py-16 px-12 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {imagePosition === 'left' ? (
          <>
            <ImageContent />
            <TextContent />
          </>
        ) : (
          <>
            <TextContent />
            <ImageContent />
          </>
        )}
      </div>
    </section>
  );
} 