
import React from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  location: string;
  beforeImage?: string;
  afterImage?: string;
  hasBeforeAfter: boolean;
  challenge?: string;
  solutions?: string;
  results?: string;
  gallery?: string[];
  beforeAfterGallery?: Array<{before: string; after: string}>;
}

interface ProjectsGridProps {
  projects: Project[];
  onViewProject: (project: Project) => void;
}

const ProjectsGrid: React.FC<ProjectsGridProps> = ({ projects, onViewProject }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {projects.map((project) => (
        <ProjectCard 
          key={project.id} 
          project={project} 
          onView={onViewProject} 
        />
      ))}
    </div>
  );
};

export default ProjectsGrid;
