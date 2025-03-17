
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: any | null;
  isAuthenticated: boolean;
  hasTempAccess: boolean;
  loading: boolean;
  signOut: () => Promise<void>;
  checkTempAccess: () => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasTempAccess, setHasTempAccess] = useState(false);
  const { toast } = useToast();

  const checkTempAccess = (): boolean => {
    const token = localStorage.getItem('tempAccessToken');
    if (token) {
      // La vérification réelle du jeton se fait via l'API Supabase
      // Cette vérification locale est juste pour l'interface utilisateur
      setHasTempAccess(true);
      return true;
    }
    setHasTempAccess(false);
    return false;
  };

  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      
      // Vérifier l'accès temporaire d'abord
      const hasTemp = checkTempAccess();
      
      // Vérifier la session Supabase
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Erreur lors de la récupération de la session:', error);
      } else if (data.session) {
        setUser(data.session.user);
      }
      
      setLoading(false);
    };
    
    getUser();
    
    const authListener = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setUser(session.user);
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });
    
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    localStorage.removeItem('tempAccessToken');
    setHasTempAccess(false);
    
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Erreur",
        description: "Impossible de se déconnecter.",
        variant: "destructive",
      });
    } else {
      setUser(null);
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès.",
      });
    }
  };

  const value = {
    user,
    isAuthenticated: !!user,
    hasTempAccess,
    loading,
    signOut,
    checkTempAccess,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
