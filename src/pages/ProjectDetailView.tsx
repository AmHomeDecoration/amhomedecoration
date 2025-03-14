
import React from 'react';
import ProjectHeader from '@/components/project/ProjectHeader';
import ProjectMainImage from '@/components/project/ProjectMainImage';
import BeforeAfterGallery from '@/components/project/BeforeAfterGallery';
import ProjectGallery from '@/components/ProjectGallery';
import ProjectStoryCards from '@/components/project/ProjectStoryCards';
import ProjectCTA from '@/components/project/ProjectCTA';

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
  beforeAfterGallery?: Array<{before: string; after: string}>;
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

  // Ensure we have a gallery array to work with
  const galleryImages = project.gallery && project.gallery.length > 0 
    ? [...project.gallery]  // Use spread operator to create a copy
    : [];

  // Add main image to gallery if it's not already in gallery and not used in before/after
  if (project.image && !project.hasBeforeAfter && !galleryImages.includes(project.image)) {
    galleryImages.push(project.image);
  }
  
  // Add after image to gallery if it's not already in gallery
  if (project.afterImage && !galleryImages.includes(project.afterImage)) {
    galleryImages.push(project.afterImage);
  }

  // Create before/after pairs for gallery
  let beforeAfterPairs = project.beforeAfterGallery || [];
  
  // If we have a beforeImage and afterImage but no dedicated beforeAfterGallery,
  // create a single pair to show in the before/after gallery
  if (beforeAfterPairs.length === 0 && project.beforeImage && project.afterImage) {
    beforeAfterPairs = [{ before: project.beforeImage, after: project.afterImage }];
  }
  
  const hasBeforeAfterGallery = beforeAfterPairs.length > 0;

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      <div className="container mx-auto container-padding py-8">
        {/* Project Header */}
        <ProjectHeader 
          title={project.title}
          location={project.location}
          category={project.category}
          onClose={onClose}
        />

        {/* Main Project Image - remplacé par le BeforeAfterGallery pour les projets avec before/after */}
        {!hasBeforeAfterGallery && (
          <ProjectMainImage 
            hasBeforeAfter={project.hasBeforeAfter}
            beforeImage={project.beforeImage}
            afterImage={project.afterImage}
            image={project.image}
            title={project.title}
          />
        )}

        {/* Before/After Gallery Section - Limited to max 4 pairs with pagination */}
        {hasBeforeAfterGallery && (
          <BeforeAfterGallery beforeAfterPairs={beforeAfterPairs} />
        )}

        {/* Project Gallery Section */}
        {galleryImages.length > 0 && (
          <ProjectGallery images={galleryImages} />
        )}

        {/* Project Story Cards */}
        <ProjectStoryCards 
          challenge={challenge}
          solutions={solutions}
          results={results}
        />

        {/* Project CTA Section */}
        <ProjectCTA onBackToProjects={onClose} />
      </div>
    </div>
  );
};

export default ProjectDetailView;
