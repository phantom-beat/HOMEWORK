export class NodoArbol {
  valor: number;
  izquierda: NodoArbol | null = null;
  derecha: NodoArbol | null = null;

  constructor(valor: number) {
    this.valor = valor;
  }
}

export class Arbol {
  raiz: NodoArbol | null = null;

  insertar(valor: number): void {
    if (this.raiz === null) {
      this.raiz = new NodoArbol(valor);
    } else {
      this._insertarRecursivo(this.raiz, valor);
    }
  }

  private _insertarRecursivo(nodo: NodoArbol, valor: number): void {
    if (valor < nodo.valor) {
      if (nodo.izquierda === null) {
        nodo.izquierda = new NodoArbol(valor);
      } else {
        this._insertarRecursivo(nodo.izquierda, valor);
      }
    } else {
      if (nodo.derecha === null) {
        nodo.derecha = new NodoArbol(valor);
      } else {
        this._insertarRecursivo(nodo.derecha, valor);
      }
    }
  }

  buscar(valor: number): boolean {
    return this._buscarRecursivo(this.raiz, valor);
  }

  private _buscarRecursivo(nodo: NodoArbol | null, valor: number): boolean {
    if (nodo === null) return false;
    if (nodo.valor === valor) return true;
    if (valor < nodo.valor) {
      return this._buscarRecursivo(nodo.izquierda, valor);
    }
    return this._buscarRecursivo(nodo.derecha, valor);
  }

  inorden(): number[] {
    const resultado: number[] = [];
    this._inordenRecursivo(this.raiz, resultado);
    return resultado;
  }

  private _inordenRecursivo(nodo: NodoArbol | null, resultado: number[]): void {
    if (nodo === null) return;
    this._inordenRecursivo(nodo.izquierda, resultado);
    resultado.push(nodo.valor);
    this._inordenRecursivo(nodo.derecha, resultado);
  }

  preorden(): number[] {
    const resultado: number[] = [];
    this._preordenRecursivo(this.raiz, resultado);
    return resultado;
  }

  private _preordenRecursivo(nodo: NodoArbol | null, resultado: number[]): void {
    if (nodo === null) return;
    resultado.push(nodo.valor);
    this._preordenRecursivo(nodo.izquierda, resultado);
    this._preordenRecursivo(nodo.derecha, resultado);
  }

  postorden(): number[] {
    const resultado: number[] = [];
    this._postordenRecursivo(this.raiz, resultado);
    return resultado;
  }

  private _postordenRecursivo(nodo: NodoArbol | null, resultado: number[]): void {
    if (nodo === null) return;
    this._postordenRecursivo(nodo.izquierda, resultado);
    this._postordenRecursivo(nodo.derecha, resultado);
    resultado.push(nodo.valor);
  }

  obtenerDatos() {
    if (this.raiz === null) return null;
    return this._convertirADatos(this.raiz);
  }

  private _convertirADatos(nodo: NodoArbol): any {
    return {
      name: nodo.valor.toString(),
      children: [
        nodo.izquierda ? this._convertirADatos(nodo.izquierda) : null,
        nodo.derecha ? this._convertirADatos(nodo.derecha) : null
      ].filter(n => n !== null)
    };
  }
}
