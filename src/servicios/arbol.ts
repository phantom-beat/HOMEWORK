import type { Nodo } from '../tipos/nodo';

export class Arbol {
  raiz: Nodo;

  constructor() {
    this.raiz = {
      id: 'raiz',
      nombre: 'Mi Sistema',
      tipo: 'carpeta',
      correoCreador: 'sistema',
      fechaCreacion: new Date().toISOString(),
      hijos: []
    };
  }

  obtenerNodoPorId(id: string, nodo: Nodo = this.raiz): Nodo | null {
    if (nodo.id === id) return nodo;
    if (nodo.hijos) {
      for (const hijo of nodo.hijos) {
        const resultado = this.obtenerNodoPorId(id, hijo);
        if (resultado) return resultado;
      }
    }
    return null;
  }

  crearNodo(nombre: string, tipo: 'carpeta' | 'archivo', correoCreador: string, idPadre: string): Nodo {
    const nuevoNodo: Nodo = {
      id: `${Date.now()}-${Math.random()}`,
      nombre,
      tipo,
      correoCreador,
      fechaCreacion: new Date().toISOString(),
      hijos: tipo === 'carpeta' ? [] : undefined
    };
    
    const padre = this.obtenerNodoPorId(idPadre);
    if (padre && padre.tipo === 'carpeta' && padre.hijos) {
      padre.hijos.push(nuevoNodo);
      return nuevoNodo;
    }
    throw new Error('No se puede crear nodo en este lugar');
  }

  eliminarNodo(id: string, nodo: Nodo = this.raiz): boolean {
    if (nodo.hijos) {
      const indice = nodo.hijos.findIndex(h => h.id === id);
      if (indice !== -1) {
        nodo.hijos.splice(indice, 1);
        return true;
      }
      for (const hijo of nodo.hijos) {
        if (this.eliminarNodo(id, hijo)) return true;
      }
    }
    return false;
  }

  renombrar(id: string, nuevoNombre: string): boolean {
    const nodo = this.obtenerNodoPorId(id);
    if (nodo) {
      nodo.nombre = nuevoNombre;
      return true;
    }
    return false;
  }

  serializar(): Nodo {
    return this.raiz;
  }

  deserializar(datos: Nodo) {
    this.raiz = datos;
  }
}
