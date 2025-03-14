
import React, { useState, useEffect } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  
  // Limit to a maximum of 4 pairs
  const limitedPairs = beforeAfterPairs.slice(0, 4);
  const pairCount = limitedPairs.length;
  
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

  if (pairCount === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-serif text-design-charcoal">Avant / Après</h2>
        {pairCount > 1 && (
          <div className="flex items-center gap-1">
            <span className="text-sm text-muted-foreground">
              {beforeAfterIndex + 1} / {pairCount}
            </span>
          </div>
        )}
      </div>
      
      <Carousel 
        className="w-full relative"
        setApi={setBeforeAfterApi}
        opts={{
          loop: true
        }}
      >
        <CarouselContent>
          {limitedPairs.map((pair, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="p-1">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        
        {pairCount > 1 && (
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
        
        {pairCount > 1 && (
          <div className="flex justify-center gap-1 mt-4">
            {limitedPairs.map((_, index) => (
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
        )}
      </Carousel>
    </div>
  );
};

export default BeforeAfterGallery;
