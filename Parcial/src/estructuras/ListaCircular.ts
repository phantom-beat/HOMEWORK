class NodoCircular<T> {
  datos: T;
  siguiente: NodoCircular<T> | null = null;

  constructor(datos: T) {
    this.datos = datos;
  }
}

export class ListaCircular<T> {
  cabeza: NodoCircular<T> | null = null;
  actual: NodoCircular<T> | null = null;

  agregar(datos: T): void {
    const nuevoNodo = new NodoCircular(datos);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cabeza.siguiente = this.cabeza;
      this.actual = this.cabeza;
    } else {
      let temp = this.cabeza;
      while (temp.siguiente !== this.cabeza) {
        temp = temp.siguiente!;
      }
      temp.siguiente = nuevoNodo;
      nuevoNodo.siguiente = this.cabeza;
    }
  }

  obtenerSiguiente(): T | null {
    if (!this.actual) return null;
    const datos = this.actual.datos;
    this.actual = this.actual.siguiente;
    return datos;
  }

  aArray(): T[] {
    if (!this.cabeza) return [];
    const resultado: T[] = [];
    let actual = this.cabeza;
    do {
      resultado.push(actual.datos);
      actual = actual.siguiente!;
    } while (actual !== this.cabeza);
    return resultado;
  }

  estaVacia(): boolean {
    return this.cabeza === null;
  }
}
