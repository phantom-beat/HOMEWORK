export interface Nodo {
  id: string;
  nombre: string;
  tipo: 'carpeta' | 'archivo';
  correoCreador: string;
  fechaCreacion: string;
  hijos?: Nodo[];
}

export interface Usuario {
  uid: string;
  correo: string;
  nombre: string;
}
