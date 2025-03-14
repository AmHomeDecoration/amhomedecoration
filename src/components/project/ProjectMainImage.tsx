
import React from 'react';
import BeforeAfterSlider from '@/components/BeforeAfterSlider';

interface ProjectMainImageProps {
  hasBeforeAfter: boolean;
  beforeImage?: string;
  afterImage?: string;
  image?: string;
  title: string;
}

const ProjectMainImage: React.FC<ProjectMainImageProps> = ({ 
  hasBeforeAfter, 
  beforeImage, 
  afterImage, 
  image,
  title
}) => {
  return (
    <div className="mb-10 rounded-xl overflow-hidden shadow-lg">
      {hasBeforeAfter && beforeImage && afterImage ? (
        <div className="h-[500px]">
          <BeforeAfterSlider
            beforeImage={beforeImage}
            afterImage={afterImage}
          />
        </div>
      ) : (
        image && (
          <img 
            src={image}
            alt={title}
            className="w-full h-[500px] object-cover"
          />
        )
      )}
    </div>
  );
};

export default ProjectMainImage;
