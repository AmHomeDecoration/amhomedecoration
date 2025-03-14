
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

interface ProjectStoryCardsProps {
  challenge: string;
  solutions: string;
  results: string;
}

const ProjectStoryCards: React.FC<ProjectStoryCardsProps> = ({ 
  challenge, 
  solutions, 
  results 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
      <Card className="bg-white">
        <CardContent className="pt-6">
          <h3 className="text-xl font-serif mb-4 text-design-charcoal">Le défi</h3>
          <p className="text-muted-foreground">{challenge}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="pt-6">
          <h3 className="text-xl font-serif mb-4 text-design-charcoal">Les solutions</h3>
          <p className="text-muted-foreground">{solutions}</p>
        </CardContent>
      </Card>
      
      <Card className="bg-white">
        <CardContent className="pt-6">
          <h3 className="text-xl font-serif mb-4 text-design-charcoal">Le résultat</h3>
          <p className="text-muted-foreground">{results}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectStoryCards;
