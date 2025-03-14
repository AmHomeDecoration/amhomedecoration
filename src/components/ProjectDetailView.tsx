
import React from 'react';
import { ArrowLeft, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BeforeAfterSlider from './BeforeAfterSlider';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface ProjectDetail {
  id: number;
  title: string;
  category: string;
  description: string;
  location: string;
  beforeImage?: string;
  afterImage?: string;
  image?: string;
  hasBeforeAfter: boolean;
  challenge?: string;
  solutions?: string;
  results?: string;
  gallery?: string[];
}

interface ProjectDetailViewProps {
  project: ProjectDetail;
  onClose: () => void;
}

const ProjectDetailView: React.FC<ProjectDetailViewProps> = ({ project, onClose }) => {
  // Default values for storytelling if not provided
  const challenge = project.challenge || "Le client souhaitait moderniser son espace tout en préservant le caractère authentique du lieu. L'espace était cloisonné, manquait de lumière naturelle et nécessitait une réorganisation complète pour répondre aux besoins actuels.";
  const solutions = project.solutions || "Nous avons opté pour un agencement ouvert en supprimant certaines cloisons non porteuses. Les matériaux naturels (bois, pierre) ont été préservés et mis en valeur. L'éclairage a été entièrement repensé avec un mélange de sources directes et indirectes pour créer une ambiance chaleureuse.";
  const results = project.results || "Le résultat est un espace à la fois contemporain et chaleureux, où la lumière circule librement. Le client bénéficie désormais d'un lieu de vie fluide, fonctionnel et esthétique qui correspond parfaitement à son mode de vie et à ses attentes.";

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="container mx-auto container-padding py-8">
        {/* Header with navigation */}
        <div className="flex justify-between items-center mb-8">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={16} />
            Retour aux projets
          </Button>
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 size={16} />
            Partager
          </Button>
        </div>

        {/* Project title */}
        <h1 className="text-3xl md:text-4xl font-serif mb-2 text-design-charcoal">{project.title}</h1>
        <div className="flex items-center gap-2 mb-8">
          <span className="bg-muted px-3 py-1 rounded-full text-sm text-muted-foreground">
            {project.location}
          </span>
          <span className="bg-design-taupe/20 px-3 py-1 rounded-full text-sm text-design-charcoal">
            {project.category === 'renovation' ? 'Rénovation' : 
             project.category === 'decoration' ? 'Décoration' : 
             project.category === 'turnkey' ? 'Clé en main' : 
             project.category === 'canohes' ? 'Canohès' : project.category}
          </span>
        </div>

        {/* Before/After or main image */}
        <div className="mb-12 rounded-xl overflow-hidden shadow-lg">
          {project.hasBeforeAfter && project.beforeImage && project.afterImage ? (
            <div className="h-[500px]">
              <BeforeAfterSlider
                beforeImage={project.beforeImage}
                afterImage={project.afterImage}
              />
            </div>
          ) : (
            project.image && (
              <img 
                src={project.image}
                alt={project.title}
                className="w-full h-[500px] object-cover"
              />
            )
          )}
        </div>

        {/* Storytelling sections */}
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

        {/* Project gallery (if available) */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif mb-6 text-design-charcoal">Galerie photos</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {project.gallery.map((image, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-square items-center justify-center p-0">
                          <img 
                            src={image} 
                            alt={`${project.title} - image ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center bg-muted p-8 rounded-xl">
          <h3 className="text-2xl font-serif mb-4 text-design-charcoal">Vous avez un projet similaire ?</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            Je peux vous accompagner dans la réalisation de votre projet de décoration ou de rénovation.
            Contactez-moi pour discuter de vos idées et transformer votre espace.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-design-charcoal hover:bg-design-black">
              Me contacter
            </Button>
            <Button variant="outline" size="lg" onClick={onClose}>
              Voir d'autres projets
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailView;
