import React from 'react';
import { MapPin, User } from 'lucide-react';

interface ServiceCardDisplayProps {
  title: string;
  description: string;
  tags: string;
  ownerName: string;
}

export function ServiceCardDisplay({ 
  title, 
  description, 
  tags, 
  ownerName
}: ServiceCardDisplayProps) {
  // Extract location from description
  const locationMatch = description.match(/\| Location: (.+?)(?:\||$)/);
  const location = locationMatch ? locationMatch[1] : 'Local Area';
  const cleanDescription = description.replace(/\| Location: .+?(?=\||$)/g, '').trim();
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm line-clamp-3">{cleanDescription}</p>
      </div>
      
      <div className="mb-4">
        <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
          {tags}
        </span>
      </div>
      
      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-700 font-medium">{ownerName}</span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-gray-500">{location}</span>
        </div>
      </div>
    </div>
  );
}