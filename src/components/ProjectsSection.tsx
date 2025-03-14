
import React, { useState } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import ProjectDetailView from './ProjectDetailView';

const projectCategories = [
  { id: 'all', label: 'Tous' },
  { id: 'renovation', label: 'Rénovation' },
  { id: 'decoration', label: 'Décoration' },
  { id: 'turnkey', label: 'Clé en main' },
  { id: 'canohes', label: 'Canohès' },
];

const projects = [
  {
    id: 1,
    title: "Villa Méditerranéenne",
    category: "renovation",
    description: "Rénovation complète d'une villa de 180m² à Argelès-sur-Mer.",
    location: "Argelès-sur-Mer",
    beforeImage: "/projets/villa-mediterraneenne/avant.jpg",
    afterImage: "/projets/villa-mediterraneenne/apres.png",
    hasBeforeAfter: true,
    challenge: "Cette villa méditerranéenne souffrait d'un aménagement démodé et cloisonné, empêchant la lumière naturelle de circuler. Les espaces manquaient de caractère et ne correspondaient plus au mode de vie des propriétaires.",
    solutions: "Nous avons réorganisé l'espace en créant une grande pièce de vie ouverte. Les matériaux traditionnels ont été conservés et mis en valeur, complétés par des touches contemporaines. Un nouveau système d'éclairage naturel et artificiel a été conçu pour maximiser la luminosité.",
    results: "La villa rayonne désormais d'une nouvelle élégance méditerranéenne. L'espace de vie fluide et lumineux offre des vues imprenables sur le jardin. Les propriétaires profitent pleinement d'un intérieur à la fois authentique et moderne, parfaitement adapté à leur quotidien.",
    gallery: [
      "/projets/villa-mediterraneenne/galerie-1.jpg",
      "/projets/villa-mediterraneenne/galerie-2.jpg",
      "/projets/villa-mediterraneenne/galerie-3.jpg",
    ]
  },
  {
    id: 2,
    title: "Appartement Haussmannien",
    category: "decoration",
    description: "Décoration sur mesure pour un appartement de caractère à Perpignan.",
    location: "Perpignan",
    image: "/projets/appartement-haussmannien/principal.jpg",
    hasBeforeAfter: false,
    challenge: "Cet appartement haussmannien possédait un fort potentiel architectural mais manquait d'une identité stylistique cohérente. Le client souhaitait préserver les éléments d'époque tout en apportant une touche contemporaine.",
    solutions: "Une palette de couleurs douces et élégantes a été sélectionnée pour mettre en valeur les moulures et parquets d'origine. Le mobilier sur mesure allie fonctionnalité moderne et esthétique classique. Les textiles et accessoires ont été choisis pour ajouter chaleur et personnalité.",
    results: "L'appartement incarne désormais un équilibre parfait entre héritage architectural et confort contemporain. Chaque pièce raconte une histoire cohérente, créant une atmosphère à la fois sophistiquée et accueillante qui correspond parfaitement aux aspirations du client."
  },
  {
    id: 3,
    title: "Maison de Campagne",
    category: "turnkey",
    description: "Projet clé en main pour une maison de campagne de 150m² dans les Pyrénées-Orientales.",
    location: "Céret",
    beforeImage: "/projets/maison-campagne/avant.jpg",
    afterImage: "/projets/maison-campagne/apres.png",
    hasBeforeAfter: true,
    challenge: "Cette maison de campagne traditionnelle nécessitait une rénovation complète. L'agencement était inefficace, les installations techniques obsolètes, et l'atmosphère générale sombre et datée.",
    solutions: "Une approche clé en main a permis de repenser entièrement l'espace. Les travaux ont inclus la refonte des circuits électriques et de plomberie, la création d'une cuisine ouverte, et l'optimisation de l'isolation thermique et phonique. Les matériaux locaux ont été privilégiés pour respecter l'authenticité du lieu.",
    results: "La transformation a donné naissance à une maison de campagne alliant charme rustique et confort moderne. L'efficacité énergétique a été considérablement améliorée, réduisant les coûts de chauffage. Les propriétaires bénéficient désormais d'un havre de paix parfaitement adapté à leurs besoins, tant pour y vivre au quotidien que pour y recevoir famille et amis."
  },
  {
    id: 4,
    title: "Loft Industriel",
    category: "renovation",
    description: "Transformation d'un ancien entrepôt en loft moderne et fonctionnel.",
    location: "Perpignan",
    image: "/projets/loft-industriel/principal.jpg",
    hasBeforeAfter: false,
    challenge: "Cet ancien entrepôt présentait un défi de taille : transformer un espace industriel brut en habitat confortable tout en préservant son caractère authentique. Les grandes hauteurs sous plafond et l'absence de cloisons nécessitaient une approche créative.",
    solutions: "Nous avons conçu un aménagement qui respecte l'esprit industriel du lieu tout en créant des zones distinctes. Des matériaux bruts comme l'acier, le béton ciré et le bois ont été utilisés. Des mezzanines ont été créées pour exploiter la hauteur, et un système de cloisons mobiles permet de moduler l'espace selon les besoins.",
    results: "Le loft offre désormais un cadre de vie exceptionnellement spacieux et flexible. L'âme industrielle du bâtiment a été préservée tout en offrant un confort optimal. Le propriétaire dispose d'un espace unique qui lui permet d'adapter son intérieur selon ses activités et qui impressionne par son caractère architectural distinctif."
  },
  {
    id: 5,
    title: "Maison Contemporaine",
    category: "canohes",
    description: "Aménagement intérieur d'une maison moderne à Canohès.",
    location: "Canohès",
    image: "/projets/canohes/maison-contemporaine.jpg",
    hasBeforeAfter: false,
    challenge: "Cette construction récente à Canohès présentait des espaces bien conçus architecturalement mais manquait de caractère et de chaleur. Les propriétaires souhaitaient un intérieur à la fois contemporain et accueillant, avec une attention particulière portée à la fonctionnalité pour leur famille.",
    solutions: "Une approche basée sur la simplicité et l'élégance a guidé nos choix. Une palette de couleurs neutres ponctuée de touches colorées apporte personnalité et dynamisme. Le mobilier a été sélectionné pour son design contemporain mais confortable, et des solutions de rangement intégrées maximisent l'espace disponible.",
    results: "La maison est désormais un exemple parfait d'équilibre entre esthétique contemporaine et confort familial. Chaque espace répond précisément aux besoins quotidiens des propriétaires tout en offrant une belle harmonie visuelle. L'atmosphère chaleureuse et sereine qu'ils recherchaient a été créée, faisant de leur maison un véritable lieu de vie et de partage."
  }
];

const PROJECTS_PER_PAGE = 4;

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE);
  const indexOfLastProject = currentPage * PROJECTS_PER_PAGE;
  const indexOfFirstProject = indexOfLastProject - PROJECTS_PER_PAGE;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Reset to page 1 when changing categories
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of projects section
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle project selection
  const handleProjectClick = (projectId: number) => {
    setSelectedProject(projectId);
    // Prevent scrolling when the detail view is open
    document.body.style.overflow = 'hidden';
  };

  // Handle closing project detail view
  const handleCloseProjectDetail = () => {
    setSelectedProject(null);
    // Restore scrolling
    document.body.style.overflow = 'auto';
  };

  // Find the selected project details
  const selectedProjectDetails = selectedProject !== null
    ? projects.find(project => project.id === selectedProject)
    : null;

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto container-padding">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif mb-4 text-design-charcoal">
            Mes réalisations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Découvrez quelques-uns de mes projets récents d'architecture d'intérieur et de décoration
            réalisés à Argelès-sur-Mer et dans toutes les Pyrénées-Orientales.
          </p>
        </div>

        <Tabs defaultValue="all" className="mb-12">
          <div className="flex justify-center">
            <TabsList className="bg-muted">
              {projectCategories.map(category => (
                <TabsTrigger 
                  key={category.id}
                  value={category.id}
                  onClick={() => handleCategoryChange(category.id)}
                  className="data-[state=active]:bg-design-taupe data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentProjects.map(project => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-lg hover-lift"
                >
                  <div className="h-80">
                    {project.hasBeforeAfter ? (
                      <BeforeAfterSlider
                        beforeImage={project.beforeImage}
                        afterImage={project.afterImage}
                      />
                    ) : (
                      <img 
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-serif text-design-charcoal">{project.title}</h3>
                      <span className="text-xs bg-muted px-2 py-1 rounded-full text-muted-foreground">
                        {project.location}
                      </span>
                    </div>
                    <p className="text-muted-foreground mb-4">{project.description}</p>
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => handleProjectClick(project.id)}
                    >
                      Voir le projet
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => handlePageChange(currentPage - 1)}
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        isActive={currentPage === index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className="cursor-pointer"
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => handlePageChange(currentPage + 1)}
                        className="cursor-pointer" 
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button size="lg" className="bg-design-charcoal hover:bg-design-black">
            Voir tous les projets
          </Button>
        </div>
      </div>

      {/* Project Detail View */}
      {selectedProjectDetails && (
        <ProjectDetailView 
          project={selectedProjectDetails}
          onClose={handleCloseProjectDetail}
        />
      )}
    </section>
  );
};

export default ProjectsSection;
