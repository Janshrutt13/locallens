import React from 'react';
import { MapPin, User, Heart, MessageCircle, Share2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface ServiceCardDisplayProps {
  title: string;
  description: string;
  tags: string;
  ownerName: string;
  serviceId?: string;
  clickable?: boolean;
}

export function ServiceCardDisplay({ 
  title, 
  description, 
  tags, 
  ownerName,
  serviceId,
  clickable = false
}: ServiceCardDisplayProps) {
  const [isLiked, setIsLiked] = React.useState(false);
  
  // Extract location from description
  const locationMatch = description.match(/\| Location: (.+?)(?:\||$)/);
  const location = locationMatch ? locationMatch[1] : 'Local Area';
  const cleanDescription = description.replace(/\| Location: .+?(?=\||$)/g, '').trim();

  // Generate a service-related image placeholder
  const serviceImage = `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=400&fit=crop&auto=format`;

  const handleClick = () => {
    if (clickable && serviceId) {
      window.location.href = `/services/${serviceId}`;
    }
  };

  return (
    <>
      <Card 
        className={`bg-white p-4 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-rotate-1 rotate-0 max-w-sm ${
          clickable ? 'cursor-pointer' : ''
        }`}
        onClick={handleClick}
      >
        <div className="space-y-4">
          {/* Service Image Area */}
          <div className="aspect-square bg-muted overflow-hidden rounded">
            <img
              src={serviceImage}
              alt={title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Service Details - Polaroid Style */}
          <div className="space-y-3 min-h-[120px]">
            <h3 className="text-foreground font-handwriting text-lg text-center px-2 font-semibold">
              {title}
            </h3>
            
            <p className="text-sm text-gray-600 text-center px-2 line-clamp-2">
              {cleanDescription}
            </p>

            {/* Category Tag */}
            <div className="flex justify-center">
              <span className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                {tags}
              </span>
            </div>

            {/* Metadata */}
            <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                <span className="font-medium text-foreground">{ownerName}</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                <span>{location}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-center gap-4 pt-2">
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-transparent"
                onClick={() => setIsLiked(!isLiked)}
              >
                <Heart
                  className={`h-4 w-4 ${
                    isLiked ? 'fill-red-500 text-red-500' : 'text-muted-foreground'
                  }`}
                />
                <span className="ml-1 text-xs text-foreground">{isLiked ? 1 : 0}</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-transparent"
              >
                <MessageCircle className="h-4 w-4 text-muted-foreground" />
                <span className="ml-1 text-xs text-foreground">0</span>
              </Button>

              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 hover:bg-transparent"
              >
                <Share2 className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
      
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;700&display=swap');
        
        .font-handwriting {
          font-family: 'Caveat', cursive;
        }
      `}</style>
    </>
  );
}