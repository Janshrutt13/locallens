import React from 'react';
import Image from 'next/image';

interface MockupProps {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export function Mockup({ src, alt, width, height }: MockupProps) {
  return (
    <div className="relative w-full max-w-full">
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-auto rounded-lg shadow-2xl"
        priority
      />
    </div>
  );
}