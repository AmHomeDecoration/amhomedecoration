
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const AboutSection = () => {
  const navigate = useNavigate();
  
  const handleLearnMore = () => {
    navigate('/prestations');
  };

  return <section id="about" className="section-padding bg-design-beige">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-design-charcoal">
              À propos
            </h2>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Passionnée d'architecture et de décoration d'intérieur, je mets mon expertise au service de vos projets pour créer des espaces qui vous ressemblent. Basée à Argelès-sur-Mer, j'interviens dans l'ensemble des Pyrénées-Orientales pour transformer vos intérieurs.
            </p>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Ma philosophie ? Allier esthétique et fonctionnalité pour concevoir des lieux de vie harmonieux qui répondent parfaitement à vos besoins et reflètent votre personnalité.
            </p>
            <div className="flex flex-wrap gap-6 mb-8">
              <div>
                <h4 className="font-serif text-xl text-design-charcoal mb-2">Conception</h4>
                <p className="text-sm text-muted-foreground">Plans 2D/3D sur mesure</p>
              </div>
              <div>
                <h4 className="font-serif text-xl text-design-charcoal mb-2">Décoration</h4>
                <p className="text-sm text-muted-foreground">Ambiances et matériaux personnalisés</p>
              </div>
              <div>
                <h4 className="font-serif text-xl text-design-charcoal mb-2">Réalisation</h4>
                <p className="text-sm text-muted-foreground">Suivi de chantier et coordination</p>
              </div>
            </div>
            <Button 
              className="bg-design-charcoal hover:bg-design-black"
              onClick={handleLearnMore}
            >
              En savoir plus
            </Button>
          </div>
          <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-2xl">
            <div className="relative h-[500px]">
              <img alt="Portrait d'architecte d'intérieur" src="/lovable-uploads/66e79af6-827f-4f01-89ca-cf6e04a3c6a5.jpg" className="w-full h-full object-scale-down" />
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
                <p className="text-white font-serif text-xl">
                  "Chaque espace a une histoire à raconter"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutSection;
