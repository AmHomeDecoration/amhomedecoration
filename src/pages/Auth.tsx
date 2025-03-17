
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import Layout from '@/components/Layout';

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tokenAccess, setTokenAccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showTokenInput, setShowTokenInput] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (data.session) {
        navigate('/');
      }
    };
    
    checkSession();
  }, [navigate]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      toast({
        title: "Erreur de connexion",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Connexion réussie",
        description: "Vous êtes maintenant connecté.",
      });
      navigate('/');
    }
    
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    
    if (error) {
      toast({
        title: "Erreur d'inscription",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Inscription réussie",
        description: "Vérifiez votre email pour confirmer l'inscription.",
      });
    }
    
    setLoading(false);
  };

  const validateTemporaryToken = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase
      .rpc('validate_temporary_token', { token_value: tokenAccess });
    
    if (error || !data) {
      toast({
        title: "Jeton invalide",
        description: "Le jeton fourni n'est pas valide ou a expiré.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Accès accordé",
        description: "Vous avez accès temporaire au site.",
      });
      // Stocker le jeton d'accès temporaire dans le localStorage
      localStorage.setItem('tempAccessToken', tokenAccess);
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-md px-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Accès au site</CardTitle>
              <CardDescription className="text-center">
                Connectez-vous ou utilisez un jeton d'accès temporaire
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="temporaryAccess" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="temporaryAccess">Accès temporaire</TabsTrigger>
                  <TabsTrigger value="signin">Connexion</TabsTrigger>
                  <TabsTrigger value="signup">Inscription</TabsTrigger>
                </TabsList>
                
                <TabsContent value="temporaryAccess">
                  <form onSubmit={validateTemporaryToken}>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="token">Jeton d'accès</Label>
                        <Input
                          id="token"
                          type="text"
                          placeholder="Entrez votre jeton d'accès temporaire"
                          value={tokenAccess}
                          onChange={(e) => setTokenAccess(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Vérification...' : 'Accéder au site'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="signin">
                  <form onSubmit={handleSignIn}>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="password">Mot de passe</Label>
                        <Input
                          id="password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Connexion...' : 'Se connecter'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">
                  <form onSubmit={handleSignUp}>
                    <div className="space-y-4 mt-4">
                      <div>
                        <Label htmlFor="signup-email">Email</Label>
                        <Input
                          id="signup-email"
                          type="email"
                          placeholder="votre@email.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="signup-password">Mot de passe</Label>
                        <Input
                          id="signup-password"
                          type="password"
                          placeholder="••••••••"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Inscription...' : 'S\'inscrire'}
                      </Button>
                    </div>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Auth;
