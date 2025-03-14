import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye } from 'lucide-react';
import ProjectDetailView from '@/pages/ProjectDetailView';

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
  gallery?: string[];
}

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    // Définition des projets
    const projectsData: Project[] = [
      {
        id: 1,
        title: "Rénovation appartement haussmannien",
        category: "renovation",
        image: "/lovable-uploads/project1.jpg",
        description: "Transformation complète d'un appartement ancien en espace contemporain",
        location: "Perpignan",
        beforeImage: "/lovable-uploads/project1_before.jpg",
        afterImage: "/lovable-uploads/project1_after.jpg",
        hasBeforeAfter: true,
        gallery: [
          "/lovable-uploads/project1-1.jpg",
          "/lovable-uploads/project1-2.jpg",
          "/lovable-uploads/project1-3.jpg"
        ]
      },
      {
        id: 2,
        title: "Décoration villa méditerranéenne",
        category: "decoration",
        image: "/lovable-uploads/project2.jpg",
        description: "Ambiance bord de mer pour cette villa familiale",
        location: "Argelès-sur-Mer",
        hasBeforeAfter: false,
        gallery: [
          "/lovable-uploads/project2-1.jpg",
          "/lovable-uploads/project2-2.jpg"
        ]
      },
    ];

    setProjects(projectsData);
    setFilteredProjects(projectsData);
  }, []);

  // Filtrer les projets par catégorie
  useEffect(() => {
    if (activeCategory === 'all') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(project => project.category === activeCategory));
    }
  }, [activeCategory, projects]);

  const handleViewProject = (project: Project) => {
    setSelectedProject(project);
  };

  const closeProjectDetail = () => {
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="bg-muted section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-design-charcoal">Mes réalisations</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez mes derniers projets de décoration et rénovation d'intérieur.
          </p>
        </div>

        {/* Onglets de catégorie */}
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="flex justify-center mb-8 flex-wrap gap-2">
            <TabsTrigger value="all" onClick={() => setActiveCategory('all')}>
              Tous les projets
            </TabsTrigger>
            <TabsTrigger value="renovation" onClick={() => setActiveCategory('renovation')}>
              Rénovation
            </TabsTrigger>
            <TabsTrigger value="decoration" onClick={() => setActiveCategory('decoration')}>
              Décoration
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProjects.map((project) => (
                <div key={project.id} className="bg-white rounded-lg overflow-hidden shadow-md hover-lift">
                  <div className="relative h-64">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif mb-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{project.location}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleViewProject(project)}
                      >
                        <Eye size={14} />
                        Voir le projet
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Affichage du détail du projet sélectionné */}
      {selectedProject && (
        <ProjectDetailView project={selectedProject} onClose={closeProjectDetail} />
      )}
    </section>
  );
};

export default ProjectsSection;
