
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import ProjectDetailView, { ProjectDetail } from '@/pages/ProjectDetailView';
import ProjectCategoryTabs from './project/ProjectCategoryTabs';
import ProjectsGrid from './project/ProjectsGrid';
import ProjectPagination from './project/ProjectPagination';
import { Project, projectsData } from '@/data/projectsData';

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  useEffect(() => {
    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);

  useEffect(() => {
    let filtered = [...projects];
    
    if (activeCategory !== 'all') {
      filtered = projects.filter(project => project.category === activeCategory);
    }
    
    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page when changing category
  }, [activeCategory, projects]);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleViewProject = (project: Project) => {
    setSelectedProject(project as ProjectDetail);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  // Calculate pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <section id="projects" className="bg-muted section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-design-charcoal">Mes réalisations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez une sélection de mes projets récents de décoration et rénovation d'intérieur dans les Pyrénées-Orientales.
          </p>
        </div>
        
        <Tabs defaultValue="all" className="mb-12">
          <ProjectCategoryTabs 
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />

          <TabsContent value={activeCategory} className="mt-0">
            <ProjectsGrid 
              projects={currentProjects}
              onViewProject={handleViewProject}
            />
            
            <ProjectPagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPrevPage={prevPage}
              onNextPage={nextPage}
            />
          </TabsContent>
        </Tabs>
      </div>

      {selectedProject && (
        <ProjectDetailView project={selectedProject} onClose={closeProjectDetail} />
      )}
    </section>
  );
};

export default ProjectsSection;
