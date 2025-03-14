
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
  const categories = [
    { id: 'all', label: 'Tous les projets' },
    { id: 'renovation', label: 'Rénovation' },
    { id: 'decoration', label: 'Décoration' }
  ];

  return (
    <TabsList className="flex justify-center mb-8 flex-wrap gap-2">
      {categories.map((category) => (
        <TabsTrigger
          key={category.id}
          value={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={activeCategory === category.id ? 'bg-design-charcoal text-white' : ''}
        >
          {category.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};

export default ProjectCategoryTabs;
