import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Usuario, ContextoAutenticacionTipo } from '../tipos';

const ContextoAutenticacion = createContext<ContextoAutenticacionTipo | undefined>(undefined);

export function ProveedorAutenticacion({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Cargar usuario del localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem('usuarioAutenticado');
    if (usuarioGuardado) {
      setUsuario(JSON.parse(usuarioGuardado));
    }
    setCargando(false);
  }, []);

  const iniciarSesion = async (email: string, contraseña: string): Promise<void> => {
    setCargando(true);
    setError(null);
    
    // Simular validación con delay
    await new Promise(resolve => setTimeout(resolve, 500));

    // Validación
    if (email === 'user@mail.com' && contraseña === '123') {
      const nuevoUsuario: Usuario = {
        email,
        nombre: 'Usuario Demo'
      };
      setUsuario(nuevoUsuario);
      localStorage.setItem('usuarioAutenticado', JSON.stringify(nuevoUsuario));
      setCargando(false);
    } else {
      setError('Email o contraseña incorrectos');
      setCargando(false);
      throw new Error('Autenticación fallida');
    }
  };

  const cerrarSesion = () => {
    setUsuario(null);
    localStorage.removeItem('usuarioAutenticado');
    setError(null);
  };

  const limpiarError = () => {
    setError(null);
  };

  return (
    <ContextoAutenticacion.Provider
      value={{
        usuario,
        estaAutenticado: usuario !== null,
        cargando,
        error,
        iniciarSesion,
        cerrarSesion,
        limpiarError
      }}
    >
      {children}
    </ContextoAutenticacion.Provider>
  );
}

export function useAutenticacion(): ContextoAutenticacionTipo {
  const contexto = useContext(ContextoAutenticacion);
  if (!contexto) {
    throw new Error('useAutenticacion debe usarse dentro de ProveedorAutenticacion');
  }
  return contexto;
}
