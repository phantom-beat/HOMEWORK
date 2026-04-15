import { Navigate } from 'react-router-dom';
import type { ReactNode } from 'react';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';

interface Props {
  children: ReactNode;
}

export function RoutaPrivada({ children }: Props) {
  const { estaAutenticado, cargando } = useAutenticacion();

  if (cargando) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>Verificando acceso...</p>
      </div>
    );
  }

  if (!estaAutenticado) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
