
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import Layout from '@/components/Layout';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { CalendarIcon, Copy, Loader, RefreshCw, Trash2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

interface Token {
  id: string;
  token: string;
  valid_until: string;
  created_at: string;
  used_at: string | null;
  is_active: boolean;
}

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [tokens, setTokens] = useState<Token[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [date, setDate] = useState<Date | undefined>(
    new Date(new Date().setDate(new Date().getDate() + 7))
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate('/auth');
      } else {
        setUser(data.session.user);
        fetchTokens();
      }
    };
    
    checkSession();
    
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        navigate('/auth');
      } else if (session) {
        setUser(session.user);
      }
    });
    
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchTokens = async () => {
    setLoading(true);
    
    const { data, error } = await supabase
      .from('temporary_access_tokens')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de récupérer les jetons d'accès.",
        variant: "destructive",
      });
    } else {
      setTokens(data || []);
    }
    
    setLoading(false);
  };

  const generateToken = async () => {
    if (!date) {
      toast({
        title: "Erreur",
        description: "Veuillez sélectionner une date d'expiration.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    
    // Générer un jeton aléatoire de 10 caractères
    const tokenChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 10; i++) {
      token += tokenChars.charAt(Math.floor(Math.random() * tokenChars.length));
    }
    
    // Configurer la date d'expiration à 23:59:59 du jour sélectionné
    const expirationDate = new Date(date);
    expirationDate.setHours(23, 59, 59, 999);
    
    const { data, error } = await supabase
      .from('temporary_access_tokens')
      .insert([
        {
          token,
          valid_until: expirationDate.toISOString(),
          created_by: user.id,
        }
      ])
      .select();
    
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de créer le jeton d'accès.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Jeton d'accès créé avec succès.",
      });
      fetchTokens();
      setIsDialogOpen(false);
    }
    
    setIsGenerating(false);
  };

  const copyToClipboard = (token: string) => {
    navigator.clipboard.writeText(token);
    toast({
      title: "Copié !",
      description: "Le jeton a été copié dans le presse-papier.",
    });
  };

  const deactivateToken = async (id: string) => {
    const { error } = await supabase
      .from('temporary_access_tokens')
      .update({ is_active: false })
      .eq('id', id);
    
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de désactiver le jeton.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Succès",
        description: "Jeton désactivé avec succès.",
      });
      fetchTokens();
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/auth');
  };

  const formatDate = (date: string) => {
    return format(new Date(date), 'PPP', { locale: fr });
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl font-bold">Administration</CardTitle>
                <CardDescription>Gérez les accès temporaires au site</CardDescription>
              </div>
              <Button variant="outline" onClick={handleSignOut}>
                Déconnexion
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Jetons d'accès temporaires</h2>
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    Créer un nouveau jeton
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Créer un jeton d'accès temporaire</DialogTitle>
                    <DialogDescription>
                      Ce jeton permettra un accès temporaire au site jusqu'à la date spécifiée.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="expiration">Date d'expiration</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            id="expiration"
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, 'PPP', { locale: fr }) : <span>Choisir une date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                            disabled={(date) => date < new Date()}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={generateToken} disabled={isGenerating}>
                      {isGenerating ? 
                        <>
                          <Loader className="mr-2 h-4 w-4 animate-spin" />
                          Génération...
                        </> : 
                        'Générer le jeton'
                      }
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            
            {loading ? (
              <div className="flex justify-center py-10">
                <Loader className="h-8 w-8 animate-spin text-gray-400" />
              </div>
            ) : tokens.length === 0 ? (
              <div className="text-center py-10 text-muted-foreground">
                Aucun jeton d'accès n'a été créé.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead className="bg-muted">
                    <tr>
                      <th className="p-3 text-left">Jeton</th>
                      <th className="p-3 text-left">Expire le</th>
                      <th className="p-3 text-left">État</th>
                      <th className="p-3 text-left">Dernière utilisation</th>
                      <th className="p-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tokens.map((token) => (
                      <tr key={token.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <div className="flex items-center">
                            <code className="bg-muted p-1 rounded">{token.token}</code>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => copyToClipboard(token.token)}
                              className="ml-2"
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="p-3">{formatDate(token.valid_until)}</td>
                        <td className="p-3">
                          {new Date(token.valid_until) < new Date() ? (
                            <Badge variant="destructive">Expiré</Badge>
                          ) : token.is_active ? (
                            <Badge variant="success" className="bg-green-500">Actif</Badge>
                          ) : (
                            <Badge variant="outline">Désactivé</Badge>
                          )}
                        </td>
                        <td className="p-3">
                          {token.used_at ? formatDate(token.used_at) : "Jamais utilisé"}
                        </td>
                        <td className="p-3 text-center">
                          {token.is_active && new Date(token.valid_until) >= new Date() && (
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => deactivateToken(token.id)}
                              title="Désactiver"
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            <div className="mt-4 flex justify-center">
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center" 
                onClick={fetchTokens}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Actualiser
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Admin;
