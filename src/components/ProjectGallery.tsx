
import React from 'react';

const ProjectGallery = ({ images }: { images: string[] }) => {
  if (!images || images.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-xl font-serif mb-4">Détails du projet</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {images.map((img, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <img src={img} alt={`Projet ${index + 1}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
