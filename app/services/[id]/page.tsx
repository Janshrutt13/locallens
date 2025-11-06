"use client";

import { useEffect, useState } from "react";
import { SimpleHeader } from "@/components/ui/simple-header";
import { ReviewForm } from "@/components/reviews/review-form";
import { ReviewList } from "@/components/reviews/review-list";
import { ServiceCardDisplay } from "@/components/ui/service-card-display";

export default function ServicePage({ params }: { params: { id: string } }) {
  const serviceId = params.id;
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const token = typeof window !== "undefined" ? localStorage.getItem("token") || "" : "";

  useEffect(() => {
    fetch(`/api/services/${serviceId}`)
      .then(res => res.json())
      .then(data => {
        setService(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [serviceId]);

  if (loading) return (
    <div className="min-h-screen bg-[#f3f1ea]">
      <SimpleHeader />
      <div className="p-8 text-center">Loading service...</div>
    </div>
  );

  if (!service) return (
    <div className="min-h-screen bg-[#f3f1ea]">
      <SimpleHeader />
      <div className="p-8 text-center">Service not found</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f3f1ea]">
      <SimpleHeader />
      <div className="max-w-3xl mx-auto py-10 space-y-8 px-4">
        {/* Service Info */}
        <div className="flex justify-center">
          <ServiceCardDisplay
            title={service.title}
            description={service.description}
            tags={service.tags}
            ownerName={service.owner?.name || 'Anonymous'}
          />
        </div>
        
        {/* Reviews Section */}
        <ReviewForm serviceId={serviceId} token={token} />
        <ReviewList serviceId={serviceId} />
      </div>
    </div>
  );
}