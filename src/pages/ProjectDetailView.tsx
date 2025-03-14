import React from 'react';
import ProjectGallery from '@/components/ProjectGallery';

interface ProjectDetail {
  title: string;
  description: string;
  beforeImage?: string;
  afterImage?: string;
  hasBeforeAfter: boolean;
  gallery?: string[];
}

const ProjectDetailView = ({ project, onClose }: { project: ProjectDetail; onClose: () => void }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-4xl w-full">
        <button onClick={onClose} className="text-gray-600 hover:text-black float-right">
          ✕
        </button>
        <h2 className="text-3xl font-serif mb-4">{project.title}</h2>
        
        {/* Slider Avant/Après */}
        {project.hasBeforeAfter && (
          <div className="relative flex justify-center items-center">
            <img src={project.beforeImage} alt="Avant" className="w-1/2" />
            <img src={project.afterImage} alt="Après" className="w-1/2" />
          </div>
        )}

        {/* Texte de description */}
        <p className="mt-4 text-muted-foreground">{project.description}</p>

        {/* Ajout de la galerie ici */}
        {project.gallery && project.gallery.length > 0 && (
          <ProjectGallery images={project.gallery} />
        )}
      </div>
    </div>
  );
};

export default ProjectDetailView;

