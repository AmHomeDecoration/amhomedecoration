
import React from 'react';
import { TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProjectCategoryTabsProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const ProjectCategoryTabs: React.FC<ProjectCategoryTabsProps> = ({
  activeCategory,
  onCategoryChange
}) => {
  return (
    <TabsList className="flex justify-center mb-8 flex-wrap gap-2">
      <TabsTrigger 
        value="all" 
        onClick={() => onCategoryChange('all')}
        className="data-[state=active]:bg-design-charcoal data-[state=active]:text-white"
      >
        Tous les projets
      </TabsTrigger>
      <TabsTrigger 
        value="renovation" 
        onClick={() => onCategoryChange('renovation')}
        className="data-[state=active]:bg-design-charcoal data-[state=active]:text-white"
      >
        Rénovation
      </TabsTrigger>
      <TabsTrigger 
        value="decoration" 
        onClick={() => onCategoryChange('decoration')}
        className="data-[state=active]:bg-design-charcoal data-[state=active]:text-white"
      >
        Décoration
      </TabsTrigger>
      <TabsTrigger 
        value="turnkey" 
        onClick={() => onCategoryChange('turnkey')}
        className="data-[state=active]:bg-design-charcoal data-[state=active]:text-white"
      >
        Clé en main
      </TabsTrigger>
      <TabsTrigger 
        value="canohes" 
        onClick={() => onCategoryChange('canohes')}
        className="data-[state=active]:bg-design-charcoal data-[state=active]:text-white"
      >
        Canohès
      </TabsTrigger>
    </TabsList>
  );
};

export default ProjectCategoryTabs;
