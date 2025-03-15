
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
      {/* Lightened Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10"></div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-white text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 leading-tight text-white drop-shadow-lg">
          Transformez votre espace,<br />sublimez votre quotidien
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-10 text-white font-medium drop-shadow-md">
          Architecture d'intérieur & décoration sur mesure à Argelès-sur-Mer et dans les Pyrénées-Orientales
        </p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center max-w-4xl mx-auto">
          <Button 
            size="lg" 
            className="bg-white text-design-charcoal hover:bg-design-gold hover:text-white shadow-lg py-6 font-semibold text-base transition-colors duration-300"
            onClick={handleDiscoverProjects}
          >
            <span className="font-serif">Découvrir mes projets</span>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg" 
            className="bg-white text-design-charcoal hover:bg-design-gold hover:text-white shadow-lg py-6 font-semibold text-base transition-colors duration-300"
            onClick={handleServicesClick}
          >
            <span className="font-serif">Prestations & services</span>
            <ClipboardList className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            size="lg" 
            className="bg-white text-design-charcoal hover:bg-design-gold hover:text-white shadow-lg py-6 font-semibold text-base transition-colors duration-300"
            onClick={handleContactClick}
          >
            <span className="font-serif">Prendre rendez-vous</span>
            <MessageSquare className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Scroll Indicator - Lightened */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
        <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center bg-white/20 backdrop-blur-sm">
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
