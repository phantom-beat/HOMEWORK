export interface Usuario {
  email: string;
  nombre: string;
}

export interface ContextoAutenticacionTipo {
  usuario: Usuario | null;
  estaAutenticado: boolean;
  cargando: boolean;
  error: string | null;
  iniciarSesion: (email: string, contraseña: string) => Promise<void>;
  cerrarSesion: () => void;
  limpiarError: () => void;
}

export interface Persona {
  id: string;
  nombre: string;
  monto: number;
  fechaLlegada: Date;
}
