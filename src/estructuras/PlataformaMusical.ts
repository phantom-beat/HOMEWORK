import { Trie } from './Trie';
import { MaxHeap, type Cancion } from './MaxHeap';
import { Grafo } from './Grafo';

export class PlataformaMusical {
  buscador: Trie;
  ranking: MaxHeap;
  recomendaciones: Grafo;

  constructor() {
    this.buscador = new Trie();
    this.ranking = new MaxHeap();
    this.recomendaciones = new Grafo();
  }

  cargarCanciones(canciones: Cancion[]) {
    canciones.forEach((cancion) => {
      this.buscador.insertarCompleta(
        cancion.titulo,
        cancion.id,
        cancion.artista,
        'generico'
      );
      this.ranking.insertar(cancion);
      this.recomendaciones.agregarCancion(
        cancion.id,
        cancion.titulo,
        cancion.artista
      );
    });
  }

  cargarCancionesConGenero(canciones: Cancion[], generos: { [id: number]: string }) {
    canciones.forEach((cancion) => {
      const genero = generos[cancion.id] || 'generico';
      this.buscador.insertarCompleta(
        cancion.titulo,
        cancion.id,
        cancion.artista,
        genero
      );
      this.ranking.insertar(cancion);
      this.recomendaciones.agregarCancion(
        cancion.id,
        cancion.titulo,
        cancion.artista
      );
    });
  }

  buscarCanciones(prefijo: string): string[] {
    return this.buscador.obtenerSugerencias(prefijo);
  }

  buscarPorArtista(artista: string) {
    return this.buscador.buscarPorArtista(artista);
  }

  buscarPorGenero(genero: string) {
    return this.buscador.buscarPorGenero(genero);
  }

  obtenerRanking(cantidad: number): Cancion[] {
    return this.ranking.obtenerTop(cantidad);
  }

  agregarRecomendacion(cancionId1: number, cancionId2: number) {
    this.recomendaciones.agregarConexion(cancionId1, cancionId2);
  }

  obtenerRecomendaciones(cancionId: number) {
    return this.recomendaciones.obtenerRecomendaciones(cancionId);
  }

  actualizarReproducciones(cancionId: number, reproducciones: number) {
    this.ranking.actualizar(cancionId, reproducciones);
  }

  cancionExiste(titulo: string): boolean {
    return this.buscador.buscar(titulo);
  }

  obtenerTodasLasCanciones() {
    return this.buscador.obtenerTodas();
  }
}
