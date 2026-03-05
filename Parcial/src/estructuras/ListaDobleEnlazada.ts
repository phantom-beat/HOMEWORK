class NodoDoblemente<T> {
  datos: T;
  siguiente: NodoDoblemente<T> | null = null;
  anterior: NodoDoblemente<T> | null = null;

  constructor(datos: T) {
    this.datos = datos;
  }
}

export class ListaDobleEnlazada<T> {
  cabeza: NodoDoblemente<T> | null = null;
  cola: NodoDoblemente<T> | null = null;

  agregar(datos: T): void {
    const nuevoNodo = new NodoDoblemente(datos);
    if (!this.cabeza) {
      this.cabeza = nuevoNodo;
      this.cola = nuevoNodo;
    } else {
      if (this.cola) {
        this.cola.siguiente = nuevoNodo;
        nuevoNodo.anterior = this.cola;
        this.cola = nuevoNodo;
      }
    }
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

  tamaño(): number {
    let cuenta = 0;
    let actual = this.cabeza;
    while (actual) {
      cuenta++;
      actual = actual.siguiente;
    }
    return cuenta;
  }
}

