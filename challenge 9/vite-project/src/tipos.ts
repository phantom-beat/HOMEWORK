export interface ElementoMenu {
  id: string;
  titulo: string;
  enlace?: string;
  componente?: React.ComponentType<any>;
  hijos?: ElementoMenu[];
}
