class NodoCircularDoble<T> {
  datos: T;
  siguiente: NodoCircularDoble<T> | null = null;
  anterior: NodoCircularDoble<T> | null = null;

  constructor(datos: T) {
    this.datos = datos;
  }
}

export class ListaCircularDobleEnlazada<T> {
  cabeza: NodoCircularDoble<T> | null = null;
  actual: NodoCircularDoble<T> | null = null;

  agregar(datos: T): void {
    const nuevoNodo = new NodoCircularDoble(datos);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cabeza.siguiente = this.cabeza;
      this.cabeza.anterior = this.cabeza;
      this.actual = this.cabeza;
    } else {
      const ultimo = this.cabeza.anterior!;
      ultimo.siguiente = nuevoNodo;
      nuevoNodo.anterior = ultimo;
      nuevoNodo.siguiente = this.cabeza;
      this.cabeza.anterior = nuevoNodo;
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
