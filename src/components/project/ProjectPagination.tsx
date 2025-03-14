
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
    <div className="flex justify-center items-center mt-8 gap-4">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={onPrevPage} 
        disabled={currentPage === 1}
        className="flex items-center gap-1"
      >
        <ChevronLeft size={16} />
        Previous
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          size="sm"
          onClick={() => {
            if (page !== currentPage) {
              // Calculate how many pages to move
              const diff = page - currentPage;
              if (diff > 0) {
                // Move forward diff times
                for (let i = 0; i < diff; i++) {
                  onNextPage();
                }
              } else {
                // Move backward |diff| times
                for (let i = 0; i < Math.abs(diff); i++) {
                  onPrevPage();
                }
              }
            }
          }}
        >
          {page}
        </Button>
      ))}

      <Button 
        variant="outline" 
        size="sm" 
        onClick={onNextPage} 
        disabled={currentPage === totalPages}
        className="flex items-center gap-1"
      >
        Next
        <ChevronRight size={16} />
      </Button>
    </div>
  );
};

export default ProjectPagination;
