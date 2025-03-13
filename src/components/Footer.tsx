
import React from 'react';
import { Instagram, Facebook, Linkedin, ArrowUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="bg-design-charcoal text-white">
      <div className="container mx-auto container-padding py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Refined Interior Vision</h3>
            <p className="text-white/70 mb-4">
              Architecture d'intérieur & décoration sur mesure à Argelès-sur-Mer et dans les Pyrénées-Orientales.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/70 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-4">Liens rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Accueil</a>
              </li>
              <li>
                <a href="#about" className="text-white/70 hover:text-white transition-colors">À propos</a>
              </li>
              <li>
                <a href="#projects" className="text-white/70 hover:text-white transition-colors">Réalisations</a>
              </li>
              <li>
                <a href="#contact" className="text-white/70 hover:text-white transition-colors">Contact</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Mentions légales</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-serif mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="text-white/70">Argelès-sur-Mer, Pyrénées-Orientales</li>
              <li>
                <a href="tel:+33600000000" className="text-white/70 hover:text-white transition-colors">
                  +33 6 XX XX XX XX
                </a>
              </li>
              <li>
                <a href="mailto:contact@refined-interior-vision.fr" className="text-white/70 hover:text-white transition-colors">
                  contact@refined-interior-vision.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Refined Interior Vision. Tous droits réservés.
          </p>
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
          >
            Retour en haut <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
