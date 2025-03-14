
import React, { useState, useEffect, useRef } from 'react';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselPrevious, 
  CarouselNext 
} from '@/components/ui/carousel';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

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
  const [isDraggingSlider, setIsDraggingSlider] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
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
      if (beforeAfterApi) {
        beforeAfterApi.off('select', onSelectHandler);
      }
    };
  }, [beforeAfterApi]);

  if (pairCount === 0) {
    return null;
  }

  const handleSliderDragStart = () => {
    setIsDraggingSlider(true);
    // When slider drag starts, we want to disable carousel dragging
    if (beforeAfterApi) {
      beforeAfterApi.canDrag = false;
    }
  };

  const handleSliderDragEnd = () => {
    setIsDraggingSlider(false);
    // Re-enable carousel dragging after a short delay to avoid accidental swipes
    if (beforeAfterApi) {
      setTimeout(() => {
        beforeAfterApi.canDrag = true;
      }, 100);
    }
  };

  const carouselOptions = {
    loop: true,
    draggable: !isDraggingSlider
  };

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
        opts={carouselOptions}
        ref={carouselRef}
      >
        <CarouselContent>
          {limitedPairs.map((pair, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="p-1">
                <div className="h-[500px]">
                  <BeforeAfterSlider 
                    beforeImage={pair.before}
                    afterImage={pair.after}
                    onDragStart={handleSliderDragStart}
                    onDragEnd={handleSliderDragEnd}
                  />
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
