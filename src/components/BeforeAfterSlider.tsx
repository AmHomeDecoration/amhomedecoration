
import React, { useState, useRef, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ beforeImage, afterImage }) => {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation to prevent carousel from capturing it
    setIsDragging(true);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.stopPropagation(); // Stop event propagation to prevent carousel from capturing it
    setIsDragging(true);
  };

  const handleMove = (clientX: number) => {
    if (!isDragging || !containerRef.current) return;
    
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const newPosition = Math.max(0, Math.min(100, (x / rect.width) * 100));
    
    setPosition(newPosition);
  };

  const handleMouseMove = (e: MouseEvent) => {
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const handleEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleEnd);
      window.addEventListener('touchmove', handleTouchMove, { passive: false });
      window.addEventListener('touchend', handleEnd);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  // Handle touch events to prevent default behavior
  useEffect(() => {
    const preventDefaultTouch = (e: TouchEvent) => {
      if (isDragging) {
        e.preventDefault();
      }
    };

    // Add passive: false to allow preventDefault() in touchmove events
    document.addEventListener('touchmove', preventDefaultTouch, { passive: false });
    
    return () => {
      document.removeEventListener('touchmove', preventDefaultTouch);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className="before-after-slider relative rounded-lg overflow-hidden h-full"
      style={{ touchAction: isDragging ? 'none' : 'auto' }}
    >
      {/* Before Image (Base Layer) */}
      <div className="w-full h-full">
        <img 
          src={beforeImage} 
          alt="Avant" 
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>
      
      {/* After Image (Top Layer with Clip Path) */}
      <div 
        className="absolute top-0 left-0 w-full h-full"
        style={{ 
          clipPath: `polygon(${position}% 0, 100% 0, 100% 100%, ${position}% 100%)` 
        }}
      >
        <img 
          src={afterImage} 
          alt="Après" 
          className="w-full h-full object-cover"
        />
      </div>
      
      {/* Vertical Divider Line */}
      <div 
        className="absolute top-0 bottom-0 w-0.5 bg-white"
        style={{ left: `${position}%` }}
      />
      
      {/* Slider Handle */}
      <div 
        className="absolute top-1/2 -translate-y-1/2 z-10 h-8 w-8 bg-white rounded-full flex items-center justify-center shadow-md cursor-grab"
        style={{ left: `${position}%`, transform: 'translate(-50%, -50%)' }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <MoveHorizontal size={20} color="#333" />
      </div>
      
      {/* "Avant" label */}
      <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-design-charcoal">
        Avant
      </div>
      
      {/* "Après" label */}
      <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-design-charcoal">
        Après
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
