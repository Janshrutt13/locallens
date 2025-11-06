"use client";

import { SimpleHeader } from "@/components/ui/simple-header";
import { ServiceCardDisplay } from "@/components/ui/service-card-display";
import { useEffect, useState } from "react";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f1ea]">
      <SimpleHeader />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Available Services</h1>
        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-gray-600">No services available yet. Be the first to post one!</p>
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
    </div>
  );
}