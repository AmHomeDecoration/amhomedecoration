
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import ProjectDetailView, { ProjectDetail } from './ProjectDetailView';
import GallerySection from './GallerySection';

// Sample images for the gallery
const sampleGalleryImages = [
  "/images/projet1-1.jpg",
  "/images/projet1-2.jpg",
  "/images/projet1-3.jpg",
  "/images/projet1-4.jpg",
  "/images/projet1-5.jpg",
];

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
  challenge?: string;
  solutions?: string;
  results?: string;
  gallery?: string[];
}

const ProjectsSection: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState<ProjectDetail | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 4;

  useEffect(() => {
    // Sample projects data
    const projectsData: Project[] = [
      {
        id: 1,
        title: "Rénovation appartement haussmannien",
        category: "renovation",
        image: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
        description: "Transformation complète d'un appartement ancien en espace contemporain",
        location: "Perpignan",
        beforeImage: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
        afterImage: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
        hasBeforeAfter: true,
        challenge: "Cet appartement haussmannien avait conservé son charme d'origine mais souffrait d'un agencement obsolète, avec des pièces cloisonnées et sombres qui ne correspondaient plus aux standards de vie actuels.",
        solutions: "Nous avons préservé les éléments architecturaux d'époque (moulures, parquet) tout en créant une circulation plus fluide entre les espaces. La cuisine a été ouverte sur le séjour et les matériaux nobles ont été mis en valeur par un éclairage repensé.",
        results: "L'appartement a retrouvé son élégance d'antan tout en offrant le confort moderne. Les propriétaires bénéficient désormais d'un espace lumineux qui respecte l'âme du lieu tout en répondant à leurs besoins contemporains.",
      },
      {
        id: 2,
        title: "Décoration villa méditerranéenne",
        category: "decoration",
        image: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
        description: "Ambiance bord de mer pour cette villa familiale",
        location: "Argelès-sur-Mer",
        hasBeforeAfter: false,
        challenge: "Les propriétaires souhaitaient insuffler une atmosphère méditerranéenne contemporaine à leur villa, en évitant les clichés trop typiques du style bord de mer.",
        solutions: "Nous avons opté pour une palette de couleurs douces inspirées de la mer et du sable, ponctuée de bleus plus profonds. Des matériaux naturels comme le lin, le bois flotté et la pierre locale ont été intégrés à une décoration épurée mais chaleureuse.",
        results: "La villa offre désormais une ambiance apaisante qui évoque subtilement l'environnement méditerranéen. L'espace est à la fois élégant pour recevoir et confortable pour la vie quotidienne de cette famille avec enfants.",
        gallery: [
          "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
          "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
        ]
      },
      {
        id: 3,
        title: "Rénovation cuisine contemporaine",
        category: "renovation",
        image: "/lovable-uploads/8104441e-b394-453a-88de-68ed736dfaa9.png",
        description: "Une cuisine fonctionnelle et design pour cette maison de village",
        location: "Collioure",
        beforeImage: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
        afterImage: "/lovable-uploads/8104441e-b394-453a-88de-68ed736dfaa9.png",
        hasBeforeAfter: true,
        challenge: "La cuisine existante, vétuste et peu pratique, ne correspondait plus aux besoins des propriétaires qui aiment recevoir et cuisiner. L'espace était mal optimisé et manquait cruellement de rangements.",
        solutions: "Nous avons conçu un agencement sur-mesure qui maximise chaque centimètre carré. Les matériaux (plan de travail en quartz, façades laquées) ont été choisis pour leur durabilité et leur facilité d'entretien, tout en apportant une touche contemporaine.",
        results: "La nouvelle cuisine combine esthétique et praticité avec de nombreux rangements, un îlot central qui favorise la convivialité et des équipements haut de gamme qui facilitent le quotidien des propriétaires.",
      },
      {
        id: 4,
        title: "Aménagement bureau à domicile",
        category: "decoration",
        image: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
        description: "Création d'un espace de travail inspirant et fonctionnel",
        location: "Canet-en-Roussillon",
        hasBeforeAfter: false,
        challenge: "Suite à la généralisation du télétravail, ce client avait besoin d'un véritable bureau à domicile, à la fois professionnel et en harmonie avec le reste de son intérieur.",
        solutions: "Nous avons transformé une chambre d'amis peu utilisée en bureau fonctionnel. Un mobilier sur-mesure a permis d'optimiser l'espace tout en intégrant de nombreux rangements. L'acoustique et l'éclairage ont fait l'objet d'une attention particulière.",
        results: "Le client dispose maintenant d'un espace de travail professionnel qui favorise sa concentration et sa productivité, tout en restant cohérent avec l'esthétique générale de sa maison.",
      },
      {
        id: 5,
        title: "Réaménagement loft industriel",
        category: "renovation",
        image: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
        description: "Transformation d'un ancien atelier en espace de vie contemporain",
        location: "Perpignan",
        hasBeforeAfter: false,
        challenge: "Cet ancien atelier offrait un beau volume mais présentait des défis en termes d'isolation, de distribution des espaces et d'intégration des éléments techniques.",
        solutions: "Tout en préservant l'esprit industriel du lieu (poutres apparentes, hauteur sous plafond), nous avons créé des zones distinctes sans cloisonner complètement. Les matériaux bruts ont été conservés et mis en valeur par des éléments plus contemporains.",
        results: "Le loft offre désormais un cadre de vie unique qui respecte l'histoire du bâtiment tout en offrant un confort optimal. Les différents espaces de vie cohabitent harmonieusement dans ce volume ouvert.",
      },
      {
        id: 6,
        title: "Décoration appartement de vacances",
        category: "decoration",
        image: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
        description: "Ambiance décontractée pour cet appartement face à la mer",
        location: "Argelès-sur-Mer",
        hasBeforeAfter: false,
        challenge: "Cet appartement de vacances devait être à la fois pratique, facile d'entretien et offrir une atmosphère relaxante qui marque une vraie rupture avec le quotidien des propriétaires.",
        solutions: "Nous avons privilégié des matériaux résistants et des textiles lavables, tout en créant une décoration inspirée par la mer toute proche. Les couleurs apaisantes et les textures naturelles invitent à la détente.",
        results: "L'appartement est devenu un véritable havre de paix où les propriétaires et leurs invités se sentent immédiatement en vacances. La décoration évoque subtilement l'environnement maritime sans tomber dans les clichés.",
      },
      {
        id: 7,
        title: "Projet de rénovation globale",
        category: "turnkey",
        image: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
        description: "Refonte complète d'une villa des années 80",
        location: "Canohès",
        beforeImage: "/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg",
        afterImage: "/lovable-uploads/2a139136-b1b6-4c3c-af62-232e41c065b0.jpg",
        hasBeforeAfter: true,
        challenge: "Cette villa n'avait jamais été rénovée depuis sa construction dans les années 80. Outre une distribution obsolète, elle présentait des problèmes d'isolation et des installations techniques vétustes.",
        solutions: "Nous avons coordonné un projet de rénovation globale incluant la refonte complète des espaces, la rénovation énergétique et la modernisation de tous les équipements, tout en respectant le budget défini.",
        results: "Les propriétaires bénéficient désormais d'une maison entièrement repensée qui répond aux standards actuels de confort et d'efficacité énergétique, tout en reflétant leur style de vie et leurs goûts personnels.",
      },
      {
        id: 8,
        title: "Rénovation d'une maison de village",
        category: "canohes",
        image: "/lovable-uploads/2d3996b6-132a-44ed-9183-8125e84a94d9.jpg",
        description: "Modernisation respectueuse d'une demeure traditionnelle",
        location: "Canohès",
        hasBeforeAfter: false,
        challenge: "Cette maison de village ancienne présentait des contraintes structurelles importantes et nécessitait une mise aux normes complète, tout en préservant son caractère authentique.",
        solutions: "Nous avons travaillé avec des artisans spécialisés dans la rénovation du bâti ancien pour respecter l'âme de cette maison, tout en y intégrant discrètement les éléments de confort modernes.",
        results: "La maison a retrouvé son charme d'antan tout en offrant un niveau de confort contemporain. Les matériaux traditionnels ont été préservés ou remplacés à l'identique, créant une continuité historique tout en répondant aux attentes actuelles.",
      },
    ];

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
        
        {/* Sample Gallery Section - Just after the heading */}
        <div className="mb-12">
          <GallerySection images={sampleGalleryImages} title="Galerie d'exemples" />
        </div>
        
        <Tabs defaultValue="all" className="mb-12">
          <TabsList className="flex justify-center mb-8 flex-wrap gap-2">
            <TabsTrigger 
              value="all" 
              onClick={() => handleCategoryChange('all')}
              className="data-[state=active]:bg-design-charcoal data-[state=active]:text-white"
            >
              Tous les projets
            </TabsTrigger>
            <TabsTrigger 
              value="renovation" 
              onClick={() => handleCategoryChange('renovation')}
              className="data-[state=active]:bg-design-charcoal data-[state=active]:text-white"
            >
              Rénovation
            </TabsTrigger>
            <TabsTrigger 
              value="decoration" 
              onClick={() => handleCategoryChange('decoration')}
              className="data-[state=active]:bg-design-charcoal data-[state=active]:text-white"
            >
              Décoration
            </TabsTrigger>
            <TabsTrigger 
              value="turnkey" 
              onClick={() => handleCategoryChange('turnkey')}
              className="data-[state=active]:bg-design-charcoal data-[state=active]:text-white"
            >
              Clé en main
            </TabsTrigger>
            <TabsTrigger 
              value="canohes" 
              onClick={() => handleCategoryChange('canohes')}
              className="data-[state=active]:bg-design-charcoal data-[state=active]:text-white"
            >
              Canohès
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeCategory} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {currentProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-md hover-lift"
                >
                  <div className="relative h-64">
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-serif mb-2 line-clamp-2">{project.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{project.location}</span>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex items-center gap-1 border-design-gold text-design-charcoal" 
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
            
            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-8 gap-2">
                <Button 
                  variant="outline" 
                  size="icon" 
                  onClick={prevPage} 
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
                  onClick={nextPage} 
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight size={16} />
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Project Detail View */}
      {selectedProject && (
        <ProjectDetailView project={selectedProject} onClose={closeProjectDetail} />
      )}
    </section>
  );
};

export default ProjectsSection;
