
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  if (!images || images.length === 0) return null;

  const handleOpenImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="mt-8">
      <h3 className="text-xl font-serif mb-4">Galerie du projet</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div 
            key={index} 
            onClick={() => handleOpenImage(img)}
            className="overflow-hidden rounded-lg shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300"
          >
            <div className="aspect-square">
              <img 
                src={img} 
                alt={`Projet ${index + 1}`} 
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
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
              onClick={(e) => {
                e.stopPropagation();
                handleCloseImage();
              }}
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

export default ProjectGallery;
