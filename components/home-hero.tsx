"use client";

import { Hero } from "@/components/ui/hero"
import { ChevronDown } from "lucide-react"
import { ServiceCardDisplay } from "@/components/ui/service-card-display"
import { useEffect, useState } from "react"

export function HomeHero() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data.slice(0, 6)); // Show only first 6 services
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const scrollToFeatured = () => {
    document.getElementById('featured-services')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <>
    <main className="min-h-screen flex flex-col bg-[#f3f1ea] px-10 -mt-14 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-green-200 to-blue-200 rounded-full animate-bounce" style={{animationDuration: '3s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-to-br from-yellow-200 to-orange-200 rounded-full animate-ping" style={{animationDuration: '4s'}}></div>
      </div>
      <Hero
        eyebrow="DISCOVER | CONNECT | GROW LOCALLY"
        title={
          <>
            <div className="whitespace-nowrap">
              <span className="font-instrument-serif font-normal">Your city, </span>
              <span className="font-instrument-serif font-normal italic">smarter, </span>
              <span className="font-instrument-serif font-normal">with LocalLens</span>
            </div>
            <div className="font-instrument-serif font-normal">
              Find and post trusted services near you
            </div>
          </>
        }
        subtitle="From tutors and home chefs to cleaners and tech experts — LocalLens connects you with the right people around you in just a few clicks."
        mockupImage={{
          src: "",
          alt: "",
          width: 0,
          height: 0,
        }}
      />
      
      {/* Smooth Scroll CTA */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
        <button 
          onClick={scrollToFeatured}
          className="flex flex-col items-center text-gray-600 hover:text-gray-800 transition-colors group"
        >
          <span className="text-sm mb-2">Explore Featured Services</span>
          <ChevronDown className="w-6 h-6 animate-bounce group-hover:animate-pulse" />
        </button>
      </div>
    </main>
    
    {/* Featured Services Section */}
    <section id="featured-services" className="min-h-screen bg-[#f3f1ea] px-10 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Featured Services</h2>
        {loading ? (
          <div className="text-center text-gray-600">Loading services...</div>
        ) : services.length === 0 ? (
          <div className="text-center text-gray-600">
            <p className="mb-4">No services available yet.</p>
            <button 
              onClick={() => window.location.href = '/create-service'}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Be the first to post a service!
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 place-items-center">
            {services.map((service: any, index: number) => (
              <div
                key={service.id}
                className="transform transition-transform duration-300 hover:scale-105"
                style={{
                  transform: `rotate(${index % 2 === 0 ? '-2deg' : '2deg'})`,
                }}
              >
                <ServiceCardDisplay
                  title={service.title}
                  description={service.description}
                  tags={service.tags}
                  ownerName={service.owner?.name || 'Anonymous'}
                  serviceId={service.id}
                  clickable={true}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
    </>
  )
}