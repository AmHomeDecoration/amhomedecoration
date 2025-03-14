
import React, { useState } from 'react';
import BeforeAfterSlider from './BeforeAfterSlider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

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
  },
  {
    id: 2,
    title: "Appartement Haussmannien",
    category: "decoration",
    description: "Décoration sur mesure pour un appartement de caractère à Perpignan.",
    location: "Perpignan",
    image: "/projets/appartement-haussmannien/principal.jpg",
    hasBeforeAfter: false,
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
  },
  {
    id: 4,
    title: "Loft Industriel",
    category: "renovation",
    description: "Transformation d'un ancien entrepôt en loft moderne et fonctionnel.",
    location: "Perpignan",
    image: "/projets/loft-industriel/principal.jpg",
    hasBeforeAfter: false,
  },
  {
    id: 5,
    title: "Maison Contemporaine",
    category: "canohes",
    description: "Aménagement intérieur d'une maison moderne à Canohès.",
    location: "Canohès",
    image: "/projets/canohes/maison-contemporaine.jpg",
    hasBeforeAfter: false,
  }
];

const ProjectsSection = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProjects = activeCategory === 'all'
    ? projects
    : projects.filter(project => project.category === activeCategory);

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
                  onClick={() => setActiveCategory(category.id)}
                  className="data-[state=active]:bg-design-taupe data-[state=active]:text-white"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          <TabsContent value={activeCategory} className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredProjects.map(project => (
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
                    <Button variant="outline" className="w-full">
                      Voir le projet
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <Button size="lg" className="bg-design-charcoal hover:bg-design-black">
            Voir tous les projets
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
