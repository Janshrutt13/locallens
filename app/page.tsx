'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push('/signin');
  }, [router]);
  
  return (
    <div className="min-h-screen bg-[#f3f1ea] flex items-center justify-center">
      <p className="text-[#2d1b0d]">Redirecting...</p>
    </div>
  );
}
