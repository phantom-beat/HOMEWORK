class Nodo<T> {
  datos: T;
  siguiente: Nodo<T> | null = null;

  constructor(datos: T) {
    this.datos = datos;
  }
}

export class ListaEnlazada<T> {
  cabeza: Nodo<T> | null = null;

  agregar(datos: T): void {
    const nuevoNodo = new Nodo(datos);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
    } else {
      let actual = this.cabeza;
      while (actual.siguiente) {
        actual = actual.siguiente;
      }
      actual.siguiente = nuevoNodo;
    }
  }

  eliminar(predicado: (datos: T) => boolean): boolean {
    if (!this.cabeza) return false;

    if (predicado(this.cabeza.datos)) {
      this.cabeza = this.cabeza.siguiente;
      return true;
    }

    let actual = this.cabeza;
    while (actual.siguiente) {
      if (predicado(actual.siguiente.datos)) {
        actual.siguiente = actual.siguiente.siguiente;
        return true;
      }
      actual = actual.siguiente;
    }
    return false;
  }

  aArray(): T[] {
    const resultado: T[] = [];
    let actual = this.cabeza;
    while (actual) {
      resultado.push(actual.datos);
      actual = actual.siguiente;
    }
    return resultado;
  }

  estaVacia(): boolean {
    return this.cabeza === null;
  }
}
