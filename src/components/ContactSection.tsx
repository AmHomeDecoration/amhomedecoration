
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, MessageSquare } from 'lucide-react';

const ContactSection = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted');
  };

  return (
    <section id="contact" className="section-padding bg-design-beige">
      <div className="container mx-auto container-padding">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif mb-6 text-design-charcoal">
              Contactez-moi
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Vous avez un projet d'architecture d'intérieur ou de décoration ? 
              N'hésitez pas à me contacter pour discuter de vos idées et besoins.
              Je serais ravie de vous accompagner dans la transformation de votre espace.
            </p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <Phone className="h-5 w-5 text-design-taupe" />
                </div>
                <div>
                  <h3 className="font-medium text-design-charcoal">Téléphone</h3>
                  <p className="text-muted-foreground">+33 6 XX XX XX XX</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <Mail className="h-5 w-5 text-design-taupe" />
                </div>
                <div>
                  <h3 className="font-medium text-design-charcoal">Email</h3>
                  <p className="text-muted-foreground">contact@refined-interior-vision.fr</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <MapPin className="h-5 w-5 text-design-taupe" />
                </div>
                <div>
                  <h3 className="font-medium text-design-charcoal">Adresse</h3>
                  <p className="text-muted-foreground">Argelès-sur-Mer, Pyrénées-Orientales</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Intervention dans tout le département
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-design-taupe" />
                </div>
                <div>
                  <h3 className="font-medium text-design-charcoal">WhatsApp</h3>
                  <p className="text-muted-foreground">+33 6 XX XX XX XX</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-serif mb-4 text-design-charcoal">Horaires</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Lundi - Vendredi</span>
                  <span className="font-medium">9h - 18h</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Samedi</span>
                  <span className="font-medium">Sur rendez-vous</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimanche</span>
                  <span className="font-medium">Fermé</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
              <h3 className="text-xl font-serif mb-6 text-design-charcoal">Envoyez-moi un message</h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Nom
                    </label>
                    <Input
                      id="name"
                      placeholder="Votre nom"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Votre email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Téléphone
                  </label>
                  <Input
                    id="phone"
                    placeholder="Votre numéro de téléphone"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Sujet
                  </label>
                  <Input
                    id="subject"
                    placeholder="Objet de votre message"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Votre message"
                    rows={5}
                    required
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="consent"
                    className="h-4 w-4 rounded border-gray-300"
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    J'accepte que mes données soient traitées pour me recontacter
                  </label>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-design-charcoal hover:bg-design-black"
                >
                  Envoyer
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
