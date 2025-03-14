
import React from 'react';
import { Button } from '@/components/ui/button';

interface ProjectCTAProps {
  onBackToProjects: () => void;
}

const ProjectCTA: React.FC<ProjectCTAProps> = ({ onBackToProjects }) => {
  return (
    <div className="text-center bg-muted p-8 rounded-xl">
      <h3 className="text-2xl font-serif mb-4 text-design-charcoal">Vous avez un projet similaire ?</h3>
      <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
        Je peux vous accompagner dans la réalisation de votre projet de décoration ou de rénovation.
        Contactez-moi pour discuter de vos idées et transformer votre espace.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button size="lg" className="bg-design-charcoal hover:bg-design-black">
          Me contacter
        </Button>
        <Button variant="outline" size="lg" onClick={onBackToProjects}>
          Voir d'autres projets
        </Button>
      </div>
    </div>
  );
};

export default ProjectCTA;
