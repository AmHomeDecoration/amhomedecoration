
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAuth?: boolean;
  requiresTempAccess?: boolean;
}

const ProtectedRoute = ({ 
  children, 
  requiresAuth = true,
  requiresTempAccess = false
}: ProtectedRouteProps) => {
  const { user, loading, checkTempAccess } = useAuth();
  
  // Vérifier l'accès temporaire
  const hasValidTempAccess = checkTempAccess();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Si l'accès temporaire est requis mais non valide ET qu'un accès authentifié est requis mais non disponible
  if ((requiresTempAccess && !hasValidTempAccess) && (requiresAuth && !user)) {
    return <Navigate to="/auth" />;
  }

  // Si seul l'accès authentifié est requis et que l'utilisateur n'est pas connecté
  if (requiresAuth && !user && !requiresTempAccess) {
    return <Navigate to="/auth" />;
  }

  // Si seul l'accès temporaire est requis et que l'utilisateur n'a pas d'accès temporaire
  if (requiresTempAccess && !hasValidTempAccess && !requiresAuth) {
    return <Navigate to="/auth" />;
  }

  // Dans tous les autres cas, afficher le contenu
  return <>{children}</>;
};

export default ProtectedRoute;
