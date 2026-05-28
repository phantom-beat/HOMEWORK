import { useState, useEffect, useRef } from 'react'
import { PlataformaMusical } from './estructuras/PlataformaMusical'
import type { Cancion } from './estructuras/MaxHeap'
import './App.scss'

const generarReproduccionesAleatorias = () => {
  const minimo = 3_500_000
  const maximo = 8_000_000
  return Math.floor(Math.random() * (maximo - minimo + 1)) + minimo
}

const generosIniciales: { [id: number]: string } = {
  1: 'Salsa', 2: 'Salsa', 3: 'Salsa', 4: 'Salsa', 5: 'Salsa',
  6: 'Dubstep', 7: 'Dubstep', 8: 'Dubstep', 9: 'Dubstep',
  10: 'Heavy Metal', 11: 'Heavy Metal', 12: 'Heavy Metal', 13: 'Heavy Metal', 14: 'Heavy Metal', 15: 'Heavy Metal',
}

function App() {
  const [plataforma] = useState(() => new PlataformaMusical())
  const datosInicialesCargados = useRef(false)
  const [busqueda, setBusqueda] = useState('')
  const [sugerencias, setSugerencias] = useState<string[]>([])
  const [ranking, setRanking] = useState<Cancion[]>([])
  const [recomendaciones, setRecomendaciones] = useState<{ id: number; titulo: string; artista: string }[]>([])
  const [cancionSeleccionada, setCancionSeleccionada] = useState<Cancion | null>(null)
  const [nuevoTitulo, setNuevoTitulo] = useState('')
  const [nuevoArtista, setNuevoArtista] = useState('')
  const [nuevoGenero, setNuevoGenero] = useState('Salsa')
  const [proximoId, setProximoId] = useState(16)
  const [generosMap, setGenerosMap] = useState<{ [id: number]: string }>(generosIniciales)

  useEffect(() => {
    if (datosInicialesCargados.current) return
    datosInicialesCargados.current = true

    const cancionesIniciales: Cancion[] = [
      { id: 1, titulo: 'El Manisero', artista: 'Beny Moré', reproducciones: 5200000 },
      { id: 2, titulo: 'Cumbanchero', artista: 'Pérez Prado', reproducciones: 4800000 },
      { id: 3, titulo: 'Lloraras', artista: 'Oscar D\'León', reproducciones: 5500000 },
      { id: 4, titulo: 'Que vueltas da la vida', artista: 'Joe Arroyo', reproducciones: 4200000 },
      { id: 5, titulo: 'La Murga', artista: 'Rubén Blades', reproducciones: 3900000 },
      { id: 6, titulo: 'Scary Monsters', artista: 'Skrillex', reproducciones: 6100000 },
      { id: 7, titulo: 'Bangarang', artista: 'Skrillex', reproducciones: 5800000 },
      { id: 8, titulo: 'Where Are Ü Now', artista: 'Jack Ü', reproducciones: 5600000 },
      { id: 9, titulo: 'Flux Pavillion Bass Cannon', artista: 'Flux Pavilion', reproducciones: 4500000 },
      { id: 10, titulo: 'Enter Sandman', artista: 'Metallica', reproducciones: 6300000 },
      { id: 11, titulo: 'Master of Puppets', artista: 'Metallica', reproducciones: 5900000 },
      { id: 12, titulo: 'Raining Blood', artista: 'Slayer', reproducciones: 5400000 },
      { id: 13, titulo: 'Highway to Hell', artista: 'AC/DC', reproducciones: 6200000 },
      { id: 14, titulo: 'Painkiller', artista: 'Judas Priest', reproducciones: 4800000 },
      { id: 15, titulo: 'Breaking the Law', artista: 'Judas Priest', reproducciones: 4600000 },
    ]

    plataforma.cargarCancionesConGenero(cancionesIniciales, generosIniciales)

    const generos = {
      salsa: [1, 2, 3, 4, 5],
      dubstep: [6, 7, 8, 9],
      heavyMetal: [10, 11, 12, 13, 14, 15],
    }

    Object.values(generos).forEach((cancionesGenero) => {
      for (let i = 0; i < cancionesGenero.length; i++) {
        for (let j = i + 1; j < cancionesGenero.length; j++) {
          plataforma.agregarRecomendacion(cancionesGenero[i], cancionesGenero[j])
        }
      }
    })

    setRanking(plataforma.obtenerRanking(15))
  }, [plataforma])

  const manejarBusqueda = (valor: string) => {
    setBusqueda(valor)
    if (valor.length > 0) {
      const resultados = plataforma.buscarCanciones(valor)
      setSugerencias(resultados)
    } else {
      setSugerencias([])
    }
  }

  const manejarSeleccionCancion = (titulo: string) => {
    const todasLasCanciones = plataforma.obtenerTodasLasCanciones()
    const cancion = todasLasCanciones.find((c) => c.titulo === titulo)
    if (cancion) {
      const cancionCompleta = plataforma.ranking.obtenerTodas().find((c) => c.id === cancion.id)
      setCancionSeleccionada(
        cancionCompleta || {
          id: cancion.id,
          titulo: cancion.titulo,
          artista: cancion.artista || 'Artista desconocido',
          reproducciones: 0,
        }
      )
      const recomendados = plataforma.obtenerRecomendaciones(cancion.id)
      setRecomendaciones(recomendados)
      setBusqueda(titulo)
      setSugerencias(recomendados.map((recomendacion) => recomendacion.titulo))
    }
  }

  const insertarCancion = () => {
    if (!nuevoTitulo.trim() || !nuevoArtista.trim()) {
      alert('Por favor completa todos los campos')
      return
    }

    const tituloLimpio = nuevoTitulo.trim()
    const artistaLimpio = nuevoArtista.trim()
    const nuevaCancion: Cancion = {
      id: proximoId,
      titulo: tituloLimpio,
      artista: artistaLimpio,
      reproducciones: generarReproduccionesAleatorias(),
    }

    plataforma.buscador.insertarCompleta(
      tituloLimpio,
      proximoId,
      artistaLimpio,
      nuevoGenero
    )
    plataforma.ranking.insertar(nuevaCancion)
    plataforma.recomendaciones.agregarCancion(proximoId, tituloLimpio, artistaLimpio)

    const nuevoGenerosMap = { ...generosMap, [proximoId]: nuevoGenero }
    setGenerosMap(nuevoGenerosMap)

    const cancionesDelGenero = Object.entries(nuevoGenerosMap)
      .filter(([_, genero]) => genero === nuevoGenero)
      .map(([id, _]) => parseInt(id))

    cancionesDelGenero.forEach((cancionId) => {
      if (cancionId !== proximoId) {
        plataforma.agregarRecomendacion(proximoId, cancionId)
      }
    })

    setBusqueda('')
    setSugerencias([])
    setCancionSeleccionada(null)
    setRecomendaciones([])
    setProximoId(proximoId + 1)
    setNuevoTitulo('')
    setNuevoArtista('')
    setNuevoGenero('Salsa')
    setRanking(plataforma.obtenerRanking(plataforma.ranking.obtenerTodas().length))
  }

  return (
    <div className="contenedor">
      <div className="encabezado">
        <h1>Spotify University</h1>
        <p>Por: Jose Aguirre</p>
      </div>

      <div className="seccion">
        <div className="buscador">
          <input
            type="text"
            placeholder="Buscar canciones..."
            value={busqueda}
            onChange={(e) => manejarBusqueda(e.target.value)}
          />
          {sugerencias.length > 0 && (
            <ul className="sugerencias">
              {sugerencias.map((sugerencia, idx) => (
                <li key={idx} onClick={() => manejarSeleccionCancion(sugerencia)}>
                  {sugerencia}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="seccion">
        <h2>Agregar Nueva Canción</h2>
        <div className="formulario">
          <input
            type="text"
            placeholder="Título de la canción"
            value={nuevoTitulo}
            onChange={(e) => setNuevoTitulo(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nombre del artista"
            value={nuevoArtista}
            onChange={(e) => setNuevoArtista(e.target.value)}
          />
          <select value={nuevoGenero} onChange={(e) => setNuevoGenero(e.target.value)}>
            <option value="Salsa">Salsa</option>
            <option value="Dubstep">Dubstep</option>
            <option value="Heavy Metal">Heavy Metal</option>
          </select>
          <button className="boton" onClick={insertarCancion}>
            Insertar Canción
          </button>
        </div>
      </div>

      <div className="seccion">
        <h2>Top Canciones</h2>
        <div className="ranking">
          <ul className="lista">
            {ranking.map((cancion, idx) => (
              <li key={cancion.id} className="elemento">
                <div className="posicion">{idx + 1}</div>
                <div className="info">
                  <div className="titulo">{cancion.titulo}</div>
                  <div className="artista">{cancion.artista}</div>
                </div>
                <div className="reproducciones">{(cancion.reproducciones / 1000000).toFixed(1)}M</div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {cancionSeleccionada && (
        <div className="modal" onClick={() => setCancionSeleccionada(null)}>
          <div className="contenido" onClick={(e) => e.stopPropagation()}>
            <h3>{cancionSeleccionada.titulo}</h3>
            <p><strong>Artista:</strong> {cancionSeleccionada.artista}</p>
            <p><strong>Reproducciones:</strong> {(cancionSeleccionada.reproducciones / 1000000).toFixed(1)}M</p>
            
            {recomendaciones.length > 0 && (
              <div>
                <h4 style={{ color: '#1db954', marginTop: '16px', marginBottom: '8px' }}>Recomendaciones Relacionadas:</h4>
                <div className="recomendaciones">
                  <ul className="lista">
                    {recomendaciones.map((cancion) => (
                      <li key={cancion.id} className="elemento">
                        <div className="info">
                          <div className="titulo">{cancion.titulo}</div>
                          <div className="artista">{cancion.artista}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            
            <div className="botones" style={{ marginTop: '20px' }}>
              <button className="boton" onClick={() => setCancionSeleccionada(null)}>Cerrar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
