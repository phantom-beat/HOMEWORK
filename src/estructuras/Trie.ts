interface NodoTrie {
  hijos: { [clave: string]: NodoTrie };
  esCancion: boolean;
  id?: number;
  artista?: string;
  genero?: string;
}

export class Trie {
  raiz: NodoTrie;
  canciones: { id: number; titulo: string; artista?: string; genero?: string }[];

  constructor() {
    this.raiz = { hijos: {}, esCancion: false };
    this.canciones = [];
  }

  insertar(titulo: string, id: number) {
    let nodo = this.raiz;
    const tituloLower = titulo.toLowerCase();

    for (const caracter of tituloLower) {
      if (!nodo.hijos[caracter]) {
        nodo.hijos[caracter] = { hijos: {}, esCancion: false };
      }
      nodo = nodo.hijos[caracter];
    }

    nodo.esCancion = true;
    nodo.id = id;
    this.guardarCancion({ id, titulo });
  }

  insertarCompleta(titulo: string, id: number, artista: string, genero: string) {
    let nodo = this.raiz;
    const tituloLower = titulo.toLowerCase();

    for (const caracter of tituloLower) {
      if (!nodo.hijos[caracter]) {
        nodo.hijos[caracter] = { hijos: {}, esCancion: false };
      }
      nodo = nodo.hijos[caracter];
    }

    nodo.esCancion = true;
    nodo.id = id;
    nodo.artista = artista;
    nodo.genero = genero;
    this.guardarCancion({ id, titulo, artista, genero });
  }

  private guardarCancion(cancion: { id: number; titulo: string; artista?: string; genero?: string }) {
    const indiceExistente = this.canciones.findIndex((actual) => actual.id === cancion.id);
    if (indiceExistente !== -1) {
      this.canciones[indiceExistente] = cancion;
      return;
    }

    this.canciones.push(cancion);
  }

  buscar(titulo: string): boolean {
    let nodo = this.raiz;
    const tituloLower = titulo.toLowerCase();

    for (const caracter of tituloLower) {
      if (!nodo.hijos[caracter]) {
        return false;
      }
      nodo = nodo.hijos[caracter];
    }

    return nodo.esCancion;
  }

  buscarPorArtista(artista: string): { id: number; titulo: string; artista?: string; genero?: string }[] {
    return this.canciones.filter((c) => c.artista?.toLowerCase() === artista.toLowerCase());
  }

  buscarPorGenero(genero: string): { id: number; titulo: string; artista?: string; genero?: string }[] {
    return this.canciones.filter((c) => c.genero?.toLowerCase() === genero.toLowerCase());
  }

  obtenerSugerencias(prefijo: string): string[] {
    let nodo = this.raiz;
    const prefijoLower = prefijo.toLowerCase();

    for (const caracter of prefijoLower) {
      if (!nodo.hijos[caracter]) {
        return [];
      }
      nodo = nodo.hijos[caracter];
    }

    const sugerencias: string[] = [];
    this.recolectarSugerencias(nodo, sugerencias);
    return sugerencias;
  }

  private recolectarSugerencias(nodo: NodoTrie, resultado: string[]) {
    if (nodo.esCancion && nodo.id !== undefined) {
      const cancion = this.canciones.find((c) => c.id === nodo.id);
      if (cancion) {
        resultado.push(cancion.titulo);
      }
    }

    for (const caracter in nodo.hijos) {
      this.recolectarSugerencias(nodo.hijos[caracter], resultado);
    }
  }

  obtenerTodas(): { id: number; titulo: string; artista?: string; genero?: string }[] {
    return this.canciones;
  }
}
