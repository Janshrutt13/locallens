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
    <div className="min-h-screen bg-gray-50">
      <SimpleHeader />
      <div className="p-8">
        <h1 className="text-3xl font-bold mb-8">Available Services</h1>
        {loading ? (
          <p>Loading services...</p>
        ) : services.length === 0 ? (
          <p className="text-gray-600">No services available yet. Be the first to post one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service: any) => (
              <ServiceCardDisplay
                key={service.id}
                title={service.title}
                description={service.description}
                tags={service.tags}
                ownerName={service.owner?.name || 'Anonymous'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}