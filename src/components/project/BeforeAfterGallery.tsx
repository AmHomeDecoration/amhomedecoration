
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';

interface BeforeAfterPair {
  before: string;
  after: string;
}

interface BeforeAfterGalleryProps {
  beforeAfterPairs: BeforeAfterPair[];
}

const BeforeAfterGallery: React.FC<BeforeAfterGalleryProps> = ({ beforeAfterPairs }) => {
  const [beforeAfterApi, setBeforeAfterApi] = useState<any>(null);
  const [beforeAfterIndex, setBeforeAfterIndex] = useState(0);

  useEffect(() => {
    if (!beforeAfterApi) return;
    
    const onSelectHandler = () => {
      setBeforeAfterIndex(beforeAfterApi.selectedScrollSnap());
    };
    
    beforeAfterApi.on('select', onSelectHandler);
    
    return () => {
      beforeAfterApi.off('select', onSelectHandler);
    };
  }, [beforeAfterApi]);

  if (beforeAfterPairs.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <h2 className="text-2xl font-serif mb-4 text-design-charcoal">Avant / Après</h2>
      
      <Carousel 
        className="w-full relative"
        setApi={setBeforeAfterApi}
        opts={{
          loop: true
        }}
      >
        <CarouselContent>
          {beforeAfterPairs.map((pair, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/2">
              <div className="p-1">
                <div className="grid grid-cols-2 gap-4">
                  <div className="overflow-hidden rounded-lg shadow-md h-64 relative group">
                    <img 
                      src={pair.before} 
                      alt={`Avant ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-design-charcoal">
                      Avant
                    </div>
                  </div>
                  <div className="overflow-hidden rounded-lg shadow-md h-64 relative group">
                    <img 
                      src={pair.after} 
                      alt={`Après ${index + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-design-charcoal">
                      Après
                    </div>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="absolute -left-4 top-1/2 -translate-y-1/2">
          <CarouselPrevious className="bg-white/80 hover:bg-white" />
        </div>
        <div className="absolute -right-4 top-1/2 -translate-y-1/2">
          <CarouselNext className="bg-white/80 hover:bg-white" />
        </div>
        
        <div className="flex justify-center gap-1 mt-4">
          {beforeAfterPairs.map((_, index) => (
            <button
              key={index}
              className={cn(
                "h-2 w-2 rounded-full transition-all duration-300",
                beforeAfterIndex === index ? "bg-design-charcoal w-4" : "bg-gray-300"
              )}
              onClick={() => beforeAfterApi?.scrollTo(index)}
              aria-label={`Aller à l'image ${index + 1}`}
            />
          ))}
        </div>
      </Carousel>
    </div>
  );
};

export default BeforeAfterGallery;
