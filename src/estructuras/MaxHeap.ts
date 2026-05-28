export interface Cancion {
  id: number;
  titulo: string;
  artista: string;
  reproducciones: number;
}

export class MaxHeap {
  heap: Cancion[];

  constructor() {
    this.heap = [];
  }

  insertar(cancion: Cancion) {
    const indiceExistente = this.heap.findIndex((actual) => actual.id === cancion.id);
    if (indiceExistente !== -1) {
      this.heap[indiceExistente] = cancion;
      this.reconstruirHeap();
      return;
    }

    this.heap.push(cancion);
    this.flotarArriba(this.heap.length - 1);
  }

  extraerMax(): Cancion | undefined {
    if (this.heap.length === 0) return undefined;
    if (this.heap.length === 1) return this.heap.pop();

    const maximo = this.heap[0];
    this.heap[0] = this.heap.pop()!;
    this.hundirAbajo(0);
    return maximo;
  }

  obtenerTop(n: number): Cancion[] {
    const temp = new MaxHeap();
    temp.heap = [...this.heap];
    const resultado: Cancion[] = [];

    for (let i = 0; i < n && temp.heap.length > 0; i++) {
      const cancion = temp.extraerMax();
      if (cancion) {
        resultado.push(cancion);
      }
    }

    return resultado;
  }

  actualizar(id: number, nuevasReproducciones: number) {
    const indice = this.heap.findIndex((c) => c.id === id);
    if (indice !== -1) {
      this.heap[indice].reproducciones = nuevasReproducciones;
      this.reconstruirHeap();
    }
  }

  private flotarArriba(indice: number) {
    while (indice > 0) {
      const indicePadre = Math.floor((indice - 1) / 2);
      if (
        this.heap[indice].reproducciones >
        this.heap[indicePadre].reproducciones
      ) {
        [this.heap[indice], this.heap[indicePadre]] = [
          this.heap[indicePadre],
          this.heap[indice],
        ];
        indice = indicePadre;
      } else {
        break;
      }
    }
  }

  private hundirAbajo(indice: number) {
    while (true) {
      let indiceAIntercambiar = indice;
      const indiceIzq = 2 * indice + 1;
      const indiceDer = 2 * indice + 2;

      if (
        indiceIzq < this.heap.length &&
        this.heap[indiceIzq].reproducciones >
          this.heap[indiceAIntercambiar].reproducciones
      ) {
        indiceAIntercambiar = indiceIzq;
      }

      if (
        indiceDer < this.heap.length &&
        this.heap[indiceDer].reproducciones >
          this.heap[indiceAIntercambiar].reproducciones
      ) {
        indiceAIntercambiar = indiceDer;
      }

      if (indiceAIntercambiar !== indice) {
        [this.heap[indice], this.heap[indiceAIntercambiar]] = [
          this.heap[indiceAIntercambiar],
          this.heap[indice],
        ];
        indice = indiceAIntercambiar;
      } else {
        break;
      }
    }
  }

  private reconstruirHeap() {
    for (let i = Math.floor(this.heap.length / 2) - 1; i >= 0; i--) {
      this.hundirAbajo(i);
    }
  }

  obtenerTodas(): Cancion[] {
    return [...this.heap];
  }
}
