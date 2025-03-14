
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProjectPaginationProps {
  currentPage: number;
  totalPages: number;
  onPrevPage: () => void;
  onNextPage: () => void;
}

const ProjectPagination: React.FC<ProjectPaginationProps> = ({
  currentPage,
  totalPages,
  onPrevPage,
  onNextPage
}) => {
  if (totalPages <= 1) return null;
  
  return (
    <div className="flex justify-center items-center mt-8 gap-2">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onPrevPage} 
        disabled={currentPage === 1}
      >
        <ChevronLeft size={16} />
      </Button>
      <span className="text-sm text-muted-foreground">
        Page {currentPage} sur {totalPages}
      </span>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onNextPage} 
        disabled={currentPage === totalPages}
      >
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default ProjectPagination;
