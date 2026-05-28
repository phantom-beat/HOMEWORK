export class Grafo {
  adyacencia: { [cancionId: number]: Set<number> };
  canciones: { [id: number]: { titulo: string; artista: string } };

  constructor() {
    this.adyacencia = {};
    this.canciones = {};
  }

  agregarCancion(id: number, titulo: string, artista: string) {
    if (!this.adyacencia[id]) {
      this.adyacencia[id] = new Set();
    }
    this.canciones[id] = { titulo, artista };
  }

  agregarConexion(cancionId1: number, cancionId2: number) {
    if (!this.adyacencia[cancionId1]) {
      this.adyacencia[cancionId1] = new Set();
    }
    if (!this.adyacencia[cancionId2]) {
      this.adyacencia[cancionId2] = new Set();
    }

    this.adyacencia[cancionId1].add(cancionId2);
    this.adyacencia[cancionId2].add(cancionId1);
  }

  obtenerRecomendaciones(cancionId: number): {
    id: number;
    titulo: string;
    artista: string;
  }[] {
    const recomendaciones: {
      id: number;
      titulo: string;
      artista: string;
    }[] = [];
    const vecinos = this.adyacencia[cancionId];

    if (!vecinos) return recomendaciones;

    vecinos.forEach((vecinoId) => {
      const cancion = this.canciones[vecinoId];
      if (cancion) {
        recomendaciones.push({
          id: vecinoId,
          titulo: cancion.titulo,
          artista: cancion.artista,
        });
      }
    });

    return recomendaciones;
  }

  obtenerVecinos(cancionId: number): number[] {
    return Array.from(this.adyacencia[cancionId] || new Set());
  }

  obtenerTodasLasConexiones(cancionId: number, profundidad: number): {
    id: number;
    titulo: string;
    artista: string;
  }[] {
    const visitados = new Set<number>();
    const resultado: {
      id: number;
      titulo: string;
      artista: string;
    }[] = [];

    const bfs = (id: number, nivel: number) => {
      if (nivel === 0 || visitados.has(id) || id === cancionId) return;

      visitados.add(id);
      const cancion = this.canciones[id];
      if (cancion) {
        resultado.push({ id, ...cancion });
      }

      const vecinos = this.adyacencia[id] || new Set();
      vecinos.forEach((vecinoId) => {
        if (!visitados.has(vecinoId)) {
          bfs(vecinoId, nivel - 1);
        }
      });
    };

    const vecinosDirectos = this.adyacencia[cancionId] || new Set();
    vecinosDirectos.forEach((vecinoId) => {
      bfs(vecinoId, profundidad - 1);
    });

    return resultado;
  }
}
