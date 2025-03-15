
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, ClipboardList, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  // Using the uploaded kitchen image
  const backgroundImageUrl = "/lovable-uploads/8104441e-b394-453a-88de-68ed736dfaa9.png";
  
  const handleDiscoverProjects = () => {
    // Smooth scroll to projects section if on homepage
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleServicesClick = () => {
    navigate('/prestations');
  };
  
  const handleContactClick = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  return (
    <section 
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ 
        backgroundImage: `url(${backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-white text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 leading-tight">
          Transformez votre espace,<br />sublimez votre quotidien
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white/90 font-medium">
          Architecture d'intérieur & décoration sur mesure à Argelès-sur-Mer et dans les Pyrénées-Orientales
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center max-w-4xl mx-auto">
          <Button 
            size="lg" 
            className="bg-white text-design-charcoal hover:bg-white/90 shadow-lg py-6 font-semibold text-base"
            onClick={handleDiscoverProjects}
          >
            Découvrir mes projets
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-2 border-white text-white hover:bg-white/20 shadow-lg py-6 font-semibold text-base"
            onClick={handleServicesClick}
          >
            Prestations & services
            <ClipboardList className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="ghost" 
            size="lg" 
            className="text-white hover:bg-white/20 shadow-lg py-6 font-semibold text-base backdrop-blur-sm bg-black/30"
            onClick={handleContactClick}
          >
            Prendre rendez-vous
            <MessageSquare className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
          <svg 
            className="w-4 h-4 text-white" 
            fill="none" 
            strokeWidth="2"
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
