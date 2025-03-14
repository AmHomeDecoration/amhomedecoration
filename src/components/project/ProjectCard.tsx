
import React from 'react';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

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

interface ProjectCardProps {
  project: Project;
  onView: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, onView }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover-lift">
      <div className="relative h-64">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover" 
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-serif mb-2 line-clamp-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">{project.location}</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center gap-1 border-design-gold text-design-charcoal" 
            onClick={() => onView(project)}
          >
            <Eye size={14} />
            Voir le projet
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
