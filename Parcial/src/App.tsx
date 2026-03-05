import { useState, useEffect } from 'react'
import { SistemaVehiculos } from './SistemaVehiculos'
import type { Vehiculo, Inversionista, RegistroAlquiler } from './tipos'

const ESTILOS = {
  contenedor: { padding: '20px', fontFamily: 'Arial', maxWidth: '1200px', margin: '0 auto' },
  titulo: { textAlign: 'center' as const, color: '#333' },
  seccion: { background: '#f9f9f9', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' },
  item: { padding: '8px', background: '#fff', margin: '5px 0', borderRadius: '4px', color: '#333' },
  boton: (bgColor: string) => ({ padding: '4px 8px', background: bgColor, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.8rem' }),
  lista: { listStyle: 'none', padding: 0, margin: 0 },
}

function App() {
  const [sistema] = useState(() => {
    const sys = new SistemaVehiculos()

    sys.agregarVehiculo({ id: 1, modelo: 'Tesla Model 3', placa: 'ABC-123', disponible: true })
    sys.agregarVehiculo({ id: 2, modelo: 'BMW i3', placa: 'DEF-456', disponible: true })
    sys.agregarVehiculo({ id: 3, modelo: 'Nissan Leaf', placa: 'GHI-789', disponible: true })
    sys.agregarVehiculo({ id: 4, modelo: 'Audi e-tron', placa: 'JKL-012', disponible: true })

    sys.agregarInversionista({ id: 1, nombre: 'Jose Aguirre', activo: true })
    sys.agregarInversionista({ id: 2, nombre: 'Jonathan Lopez', activo: true })
    sys.agregarInversionista({ id: 3, nombre: 'Ana Salgado', activo: true })
    sys.agregarInversionista({ id: 4, nombre: 'Clara Lucía', activo: true })
    sys.agregarInversionista({ id: 5, nombre: 'Cesar Alava', activo: true })

    return sys
  })

  const [vehiculosDisponibles, setVehiculosDisponibles] = useState<Vehiculo[]>([])
  const [historialAlquileres, setHistorialAlquileres] = useState<RegistroAlquiler[]>([])
  const [todosInversionistas, setTodosInversionistas] = useState<Inversionista[]>([])
  const [vehiculoDestacado, setVehiculoDestacado] = useState<Vehiculo | null>(null)

  useEffect(() => {
    setVehiculosDisponibles(sistema.obtenerVehiculosDisponibles())
    setHistorialAlquileres(sistema.obtenerHistorialAlquileres())
    setTodosInversionistas(sistema.obtenerTodosLosInversionistas())
    setVehiculoDestacado(sistema.obtenerSiguienteVehiculoDestacado())
  }, [sistema])

  useEffect(() => {
    const interval = setInterval(() => {
      const siguiente = sistema.obtenerSiguienteVehiculoDestacado()
      setVehiculoDestacado(siguiente)
    }, 5000)

    return () => clearInterval(interval)
  }, [sistema])

  const manejarAlquilerVehiculo = (vehiculoId: number) => {
    const exito = sistema.alquilarVehiculo(vehiculoId)
    if (exito) {
      setVehiculosDisponibles(sistema.obtenerVehiculosDisponibles())
      setHistorialAlquileres(sistema.obtenerHistorialAlquileres())
    }
  }

  return (
    <div style={ESTILOS.contenedor}>
      <h1 style={ESTILOS.titulo}>Gestión de Vehículos</h1>

      <div style={{ background: '#f0f0f0', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
        <h2 style={{ marginTop: 0, color: '#333' }}>Vehículo Destacado</h2>
        {vehiculoDestacado ? (
          <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', border: '2px solid #ffd700' }}>
            <p style={{ color: '#333', margin: '5px 0' }}><strong>{vehiculoDestacado.modelo}</strong></p>
            <p style={{ color: '#333', margin: '5px 0' }}>Placa: {vehiculoDestacado.placa}</p>
          </div>
        ) : (
          <p style={{ color: '#333' }}>No hay vehículos destacados</p>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        <div style={ESTILOS.seccion}>
          <h2 style={{ marginTop: 0, color: '#333' }}>Vehículos Disponibles</h2>
          {vehiculosDisponibles.length > 0 ? (
            <ul style={ESTILOS.lista}>
              {vehiculosDisponibles.map(vehiculo => (
                <li key={vehiculo.id} style={{ ...ESTILOS.item, display: 'flex', justifyContent: 'space-between', borderLeft: '4px solid #667eea' }}>
                  <span style={{ flex: 1, color: '#333' }}>{vehiculo.modelo} - {vehiculo.placa}</span>
                  <button onClick={() => manejarAlquilerVehiculo(vehiculo.id)} style={ESTILOS.boton('#667eea')}>
                    Alquilar
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#333' }}>No hay vehículos disponibles</p>
          )}
        </div>

        <div style={ESTILOS.seccion}>
          <h2 style={{ marginTop: 0, color: '#333' }}>Historial de Alquileres</h2>
          {historialAlquileres.length > 0 ? (
            <ul style={{ ...ESTILOS.lista, maxHeight: '300px', overflowY: 'auto' }}>
              {historialAlquileres.map((registro, idx) => (
                <li key={idx} style={{ ...ESTILOS.item, borderLeft: '4px solid #26c6da' }}>
                  <span style={{ fontWeight: 500, color: '#333' }}>{registro.modelo} ({registro.placa})</span>
                  <small style={{ color: '#999', fontSize: '0.8rem', display: 'block', marginTop: '3px' }}>{new Date(registro.alquiladoEn).toLocaleString()}</small>
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#333' }}>No hay alquileres registrados</p>
          )}
        </div>

        <div style={ESTILOS.seccion}>
          <h2 style={{ marginTop: 0, color: '#333' }}>Inversionistas Activos</h2>
          {todosInversionistas.length > 0 ? (
            <ul style={ESTILOS.lista}>
              {todosInversionistas.map(inversionista => (
                <li key={inversionista.id} style={{ ...ESTILOS.item, borderLeft: '4px solid #66bb6a' }}>
                  {inversionista.nombre}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ color: '#333' }}>No hay inversionistas</p>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  )
}

export default App
