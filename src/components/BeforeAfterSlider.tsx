
import React, { useState, useRef, useEffect } from 'react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeAlt = "Avant",
  afterAlt = "Après"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Handle mouse down on slider handle
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  // Handle touch start on slider handle
  const handleTouchStart = () => {
    setIsDragging(true);
  };

  // Update slider position on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && sliderRef.current) {
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const newPosition = ((e.clientX - sliderRect.left) / sliderRect.width) * 100;
        setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && sliderRef.current && e.touches[0]) {
        const sliderRect = sliderRef.current.getBoundingClientRect();
        const newPosition = ((e.touches[0].clientX - sliderRect.left) / sliderRect.width) * 100;
        setSliderPosition(Math.min(Math.max(newPosition, 0), 100));
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div 
      ref={sliderRef}
      className="before-after-slider rounded-lg overflow-hidden"
    >
      {/* Before Image */}
      <img
        src={beforeImage}
        alt={beforeAlt}
        className="slider-image"
      />
      
      {/* After Image */}
      <img
        src={afterImage}
        alt={afterAlt}
        className="slider-image slider-image-after"
        style={{ clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)` }}
      />
      
      {/* Slider Handle */}
      <div 
        className="slider-handle"
        style={{ left: `${sliderPosition}%` }}
      />
      
      {/* Slider Button */}
      <div
        className="slider-button"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9 18L3 12L9 6" stroke="#363636" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M15 6L21 12L15 18" stroke="#363636" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
      
      {/* Labels */}
      <div className="absolute bottom-4 left-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-design-charcoal z-10">
        {beforeAlt}
      </div>
      <div className="absolute bottom-4 right-4 bg-white/80 px-3 py-1 rounded-full text-sm font-medium text-design-charcoal z-10">
        {afterAlt}
      </div>
    </div>
  );
};

export default BeforeAfterSlider;
