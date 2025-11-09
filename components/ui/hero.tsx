'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Mockup } from '@/components/ui/mockup';

interface HeroProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  mockupImage: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  mockupImage,
}: HeroProps) {
  const router = useRouter();
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between min-h-screen py-20">
      <div className="flex-1 max-w-2xl mb-12 lg:mb-0 lg:pr-12">
        <div className="text-sm font-medium text-[#7c5a3a] mb-4 tracking-wider uppercase">
          {eyebrow}
        </div>
        <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-6 text-[#2d1b0d]">
          {title}
        </h1>
        <p className="text-lg text-[#4b2e14] mb-8 leading-relaxed">
          {subtitle}
        </p>
        <div className="flex gap-4 relative z-10">
          <button 
            onClick={() => window.location.href = '/services'}
            className="bg-[#b84f15] hover:bg-[#d75a1f] text-white px-6 py-3 rounded-lg transition-colors cursor-pointer pointer-events-auto"
          >
            Browse Services
          </button>
          <button 
            onClick={() => window.location.href = '/create-service'}
            className="border border-[#b84f15] bg-transparent text-[#b84f15] hover:bg-[#b84f15] hover:text-white px-6 py-3 rounded-lg transition-colors cursor-pointer pointer-events-auto"
          >
            Post a Service
          </button>
        </div>
      </div>
      {mockupImage.src && (
        <div className="flex-1 max-w-2xl">
          <Mockup {...mockupImage} />
        </div>
      )}
    </div>
  );
}