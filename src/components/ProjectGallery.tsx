
import React, { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

const ProjectGallery = ({ images }: { images: string[] }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [api, setApi] = useState<any>(null);
  const [current, setCurrent] = useState(0);

  // Si moins de 1 image, ne rien afficher
  if (!images || images.length < 1) return null;

  useEffect(() => {
    if (!api) return;
    
    const onChange = () => {
      setCurrent(api.selectedScrollSnap());
    };
    
    api.on("select", onChange);
    
    return () => {
      api.off("select", onChange);
    };
  }, [api]);

  const handleOpenImage = (image: string) => {
    setSelectedImage(image);
  };

  const handleCloseImage = () => {
    setSelectedImage(null);
  };

  return (
    <div className="my-16">
      <h3 className="text-3xl font-serif mb-6 text-center">DÉTAILS DU PROJET</h3>
      
      <Carousel 
        className="w-full relative"
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
      >
        <CarouselContent>
          {images.map((img, index) => (
            <CarouselItem key={index}>
              <div 
                className="overflow-hidden rounded-lg cursor-pointer h-80 md:h-[400px]"
                onClick={() => handleOpenImage(img)}
              >
                <img 
                  src={img} 
                  alt={`Projet ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {images.length > 1 && (
          <>
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 z-10">
              <CarouselPrevious className="bg-white/80 hover:bg-white border-none">
                <ChevronLeft className="h-4 w-4" />
              </CarouselPrevious>
            </div>
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 z-10">
              <CarouselNext className="bg-white/80 hover:bg-white border-none">
                <ChevronRight className="h-4 w-4" />
              </CarouselNext>
            </div>
          </>
        )}
        
        {/* Pagination dots at bottom */}
        {images.length > 1 && (
          <div className="flex justify-center gap-3 mt-8">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "h-3 w-3 rounded-full transition-colors",
                  current === index ? "bg-gray-800" : "bg-gray-300"
                )}
                onClick={() => api?.scrollTo(index)}
                aria-label={`Aller à l'image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </Carousel>
      
      {/* Modal for enlarged image */}
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
