
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
  const { user, hasTempAccess, loading, checkTempAccess } = useAuth();
  
  // Vérifier à nouveau le jeton temporaire
  const hasValidTempAccess = checkTempAccess();

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Si l'accès temporaire est requis et que l'utilisateur n'a pas d'accès temporaire
  if (requiresTempAccess && !hasValidTempAccess) {
    return <Navigate to="/auth" />;
  }

  // Si l'authentification est requise et que l'utilisateur n'est pas authentifié
  if (requiresAuth && !user && !hasValidTempAccess) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
