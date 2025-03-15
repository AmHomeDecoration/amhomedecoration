
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Check, Home, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Prestations = () => {
  const navigate = useNavigate();
  
  const handleContactClick = () => {
    navigate('/#contact');
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-20 bg-design-beige">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-serif font-medium mb-6 leading-tight text-design-charcoal">
              Nos Prestations
            </h1>
            <p className="text-lg md:text-xl max-w-3xl mx-auto mb-8 text-muted-foreground">
              Architecture d'intérieur & décoration sur mesure à Argelès-sur-Mer et dans les Pyrénées-Orientales
            </p>
          </div>
        </section>

        {/* Particuliers Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-design-beige rounded-full mb-4">
                <Home className="h-6 w-6 text-design-charcoal" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-design-charcoal mb-4">Pour les Particuliers</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des solutions adaptées à vos projets résidentiels, quelle que soit leur envergure
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-12">
              {/* Service 1 */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <span className="text-2xl font-serif text-design-charcoal">1️⃣</span>
                    <h3 className="text-2xl font-serif text-design-charcoal mt-2">Conception & Architecture d'Intérieur</h3>
                    <p className="mt-3 text-muted-foreground">
                      Transformez votre intérieur en un espace unique et harmonieux.
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Étude approfondie de vos besoins et aspirations</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Création de plans et modélisation 3D réaliste</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Optimisation des volumes, de la circulation et de la lumière</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Sélection des matériaux et finitions haut de gamme</span>
                    </li>
                  </ul>
                  
                  <div className="border-t border-design-stone pt-4 mb-4">
                    <h4 className="font-medium text-design-charcoal mb-3">Pour qui ?</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Propriétaires souhaitant une rénovation totale ou partielle</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Investisseurs immobiliers désireux d'optimiser un bien</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Nouveaux acquéreurs souhaitant adapter leur intérieur à leur style de vie</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Service 2 */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <span className="text-2xl font-serif text-design-charcoal">2️⃣</span>
                    <h3 className="text-2xl font-serif text-design-charcoal mt-2">Décoration & Mise en Scène</h3>
                    <p className="mt-3 text-muted-foreground">
                      Sublimez votre intérieur avec une décoration à votre image.
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Ambiance et style personnalisés selon votre univers</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Sélection du mobilier, textiles et accessoires déco</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Création d'une palette harmonieuse de couleurs et matières</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Agencement optimisé pour allier esthétique et praticité</span>
                    </li>
                  </ul>
                  
                  <div className="border-t border-design-stone pt-4 mb-4">
                    <h4 className="font-medium text-design-charcoal mb-3">Idéal pour :</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Moderniser une pièce sans gros travaux</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Mettre en valeur un bien avant une vente immobilière</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Apporter du cachet et du caractère à un intérieur neutre</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Service 3 */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <span className="text-2xl font-serif text-design-charcoal">3️⃣</span>
                    <h3 className="text-2xl font-serif text-design-charcoal mt-2">Rénovation & Aménagement Clé en Main</h3>
                    <p className="mt-3 text-muted-foreground">
                      Un projet maîtrisé de A à Z, avec un accompagnement sur mesure.
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Étude technique et budgétaire détaillée</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Coordination des artisans et suivi du chantier</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Sélection des matériaux et finitions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Livraison d'un projet clé en main, sans stress</span>
                    </li>
                  </ul>
                  
                  <div className="border-t border-design-stone pt-4 mb-4">
                    <h4 className="font-medium text-design-charcoal mb-3">Parfait pour :</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Une rénovation complète ou partielle</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Un projet sur mesure, du premier croquis à la touche finale</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Gagner du temps et éviter les imprévus grâce à une gestion experte</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              {/* Service 4 */}
              <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <span className="text-2xl font-serif text-design-charcoal">4️⃣</span>
                    <h3 className="text-2xl font-serif text-design-charcoal mt-2">Coaching Déco & Conseil Express</h3>
                    <p className="mt-3 text-muted-foreground">
                      Visite Conseil – Un accompagnement personnalisé
                    </p>
                  </div>
                  
                  <p className="mb-4 text-sm">
                    Lors d'un rendez-vous à votre domicile, Anne-Marie Wimez, décoratrice et architecte d'intérieur, vous apporte son expertise et ses conseils avisés pour optimiser votre espace et sublimer votre intérieur.
                  </p>
                  <p className="mb-4 text-sm">
                    Pendant 2 heures, profitez de son regard professionnel, de ses nuanciers, catalogues et échantillons pour vous guider dans vos choix de couleurs, matériaux et agencements. À l'issue de cette visite, vous aurez toutes les clés en main pour concrétiser votre projet en toute sérénité.
                  </p>
                  
                  <div className="bg-design-beige p-4 rounded-md mb-6">
                    <p className="text-design-charcoal font-medium mb-2">💰 Tarif : 280 €</p>
                    <p className="text-sm text-design-charcoal">
                      📍 Zone d'intervention : 30 km autour d'Argelès-sur-Mer. Au-delà, un supplément de 1 €/km sera appliqué pour toute intervention en Occitanie.
                    </p>
                  </div>
                  
                  <div className="border-t border-design-stone pt-4 mb-4">
                    <h4 className="font-medium text-design-charcoal mb-3">Idéal si vous souhaitez :</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Bénéficier d'un regard professionnel sans engagement sur un gros projet</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Apporter des améliorations concrètes avec un budget maîtrisé</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Avoir une expertise rapide avant de faire des choix définitifs</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Section Professionnels */}
        <section className="py-16 bg-design-beige">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center p-3 bg-white rounded-full mb-4">
                <Briefcase className="h-6 w-6 text-design-charcoal" />
              </div>
              <h2 className="text-3xl md:text-4xl font-serif text-design-charcoal mb-4">Pour les Professionnels</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Des solutions adaptées à votre entreprise, pour valoriser votre image et optimiser vos espaces
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="border-0 shadow-lg overflow-hidden bg-white">
                <CardContent className="p-8">
                  <div className="mb-6">
                    <span className="text-2xl font-serif text-design-charcoal">1️⃣</span>
                    <h3 className="text-2xl font-serif text-design-charcoal mt-2">Aménagement d'Espaces Commerciaux & Tertiaires</h3>
                    <p className="mt-3 text-muted-foreground">
                      Créez un environnement professionnel à la hauteur de votre image.
                    </p>
                  </div>
                  
                  <ul className="space-y-3 mb-6">
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Conception sur mesure pour boutiques, bureaux, restaurants, hôtels, espaces de coworking…</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Optimisation des espaces pour favoriser l'expérience client et le bien-être des collaborateurs</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Sélection de matériaux résistants et conformes aux normes ERP</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-1 text-design-taupe">•</span>
                      <span>Aménagement ergonomique et fonctionnel</span>
                    </li>
                  </ul>
                  
                  <div className="border-t border-design-stone pt-4 mb-4">
                    <h4 className="font-medium text-design-charcoal mb-3">Pour qui ?</h4>
                    <ul className="space-y-2">
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Commerçants souhaitant une boutique attractive et optimisée</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Restaurateurs & hôteliers recherchant une ambiance immersive et cohérente</span>
                      </li>
                      <li className="flex items-start">
                        <Check className="h-5 w-5 text-design-taupe mr-2 flex-shrink-0" />
                        <span>Entrepreneurs et dirigeants voulant un cadre de travail performant et inspirant</span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center justify-center p-3 bg-design-beige rounded-full mb-4">
              <Star className="h-6 w-6 text-design-charcoal" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif text-design-charcoal mb-4">Besoin d'un projet sur mesure ?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Chaque projet est unique, qu'il soit résidentiel ou professionnel. Contactez-moi pour échanger sur vos besoins et créer ensemble un espace qui vous ressemble.
            </p>
            <div className="mb-8">
              <p className="text-design-charcoal">
                📞 Contact rapide : [WhatsApp, téléphone, email]
              </p>
              <p className="text-design-charcoal">
                📍 Zone d'intervention : Argelès-sur-Mer, Perpignan et les Pyrénées-Orientales
              </p>
            </div>
            <Button 
              size="lg" 
              className="bg-design-charcoal hover:bg-design-gold hover:text-white transition-colors duration-300"
              onClick={handleContactClick}
            >
              Contactez-nous
            </Button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Prestations;
