
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GallerySectionProps {
  images: string[];
  title?: string;
}

const GallerySection: React.FC<GallerySectionProps> = ({ 
  images, 
  title = "Galerie du projet" 
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleOpenImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      {title && <h2 className="text-2xl font-serif mb-4 text-design-charcoal">{title}</h2>}
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <div 
            key={index} 
            className="aspect-square rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all cursor-pointer"
            onClick={() => handleOpenImage(image)}
          >
            <img 
              src={image} 
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
            />
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/80 z-[60] flex items-center justify-center p-4"
          onClick={handleCloseImage}
        >
          <div className="relative max-w-4xl w-full">
            <Button 
              variant="ghost" 
              size="icon"
              className="absolute top-2 right-2 bg-white/20 hover:bg-white/40 z-10 rounded-full"
              onClick={handleCloseImage}
            >
              <X className="h-6 w-6 text-white" />
            </Button>
            <img 
              src={selectedImage} 
              alt="Vue agrandie" 
              className="max-h-[85vh] w-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GallerySection;
