
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 bg-black/30 z-10"></div>
      <video 
        className="video-background"
        autoPlay
        muted
        loop
        playsInline
        poster="/placeholder.svg"
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-white-living-room-interior-with-tv-space-5403-large.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-20 text-white text-center">
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 leading-tight">
          Transformez votre espace,<br />sublimez votre quotidien
        </h1>
        <p className="text-lg md:text-xl max-w-2xl mx-auto mb-8 text-white/90">
          Architecture d'intérieur & décoration sur mesure à Argelès-sur-Mer et dans les Pyrénées-Orientales
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            size="lg" 
            className="bg-white text-design-charcoal hover:bg-white/90"
          >
            Découvrir mes projets
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white text-white hover:bg-white/20"
          >
            Demander un devis
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
