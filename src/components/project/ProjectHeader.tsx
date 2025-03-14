
import React from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectHeaderProps {
  title: string;
  location: string;
  category: string;
  onClose: () => void;
}

const ProjectHeader: React.FC<ProjectHeaderProps> = ({ 
  title, 
  location, 
  category, 
  onClose 
}) => {
  const getCategoryDisplayName = (category: string) => {
    switch (category) {
      case 'renovation': return 'Rénovation';
      case 'decoration': return 'Décoration';
      case 'turnkey': return 'Clé en main';
      case 'canohes': return 'Canohès';
      default: return category;
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-8">
        <Button 
          variant="ghost" 
          onClick={onClose}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Retour aux projets
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Share2 size={16} />
          Partager
        </Button>
      </div>

      <h1 className="text-3xl md:text-4xl font-serif mb-2 text-design-charcoal">{title}</h1>
      <div className="flex items-center gap-2 mb-8">
        <span className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground">
          {location}
        </span>
        <span className="bg-design-taupe/20 px-3 py-1 rounded-full text-sm text-design-charcoal">
          {getCategoryDisplayName(category)}
        </span>
      </div>
    </>
  );
};

export default ProjectHeader;
