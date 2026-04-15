import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Persona } from '../tipos';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';

export class Cola<T> {
  private items: T[] = [];

  encolar(elemento: T): void {
    this.items.push(elemento);
  }

  desencolar(): T | undefined {
    return this.items.shift();
  }

  ver(): T | undefined {
    return this.items[0];
  }

  tamaño(): number {
    return this.items.length;
  }

  estaVacia(): boolean {
    return this.items.length === 0;
  }

  obtenerItems(): T[] {
    return [...this.items];
  }

  limpiar(): void {
    this.items = [];
  }
}

export function PaginaEjercicio1() {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAutenticacion();
  const [cola] = useState(() => new Cola<Persona>());
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [nombre, setNombre] = useState('');
  const [monto, setMonto] = useState('');

  const generarId = () => `persona-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

  const agregarPersona = (e: React.FormEvent) => {
    e.preventDefault();

    if (!nombre.trim() || !monto.trim()) {
      alert('Por favor completa todos los campos');
      return;
    }

    if (isNaN(Number(monto)) || Number(monto) <= 0) {
      alert('El monto debe ser un número positivo');
      return;
    }

    const nuevaPersona: Persona = {
      id: generarId(),
      nombre: nombre.trim(),
      monto: Number(monto),
      fechaLlegada: new Date()
    };

    cola.encolar(nuevaPersona);
    const personasActuales = cola.obtenerItems();
    setPersonas(personasActuales);

    setNombre('');
    setMonto('');
  };

  const atenderPersona = () => {
    if (!personas.length) {
      alert('No hay personas en la cola');
      return;
    }
    cola.desencolar();
    const personasActuales = cola.obtenerItems();
    setPersonas(personasActuales);
  };

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <div className="contenedor-pagina">
      <header className="encabezado">
        <div>
          <button onClick={() => navigate('/')} className="boton-atras">
            ← Atrás
          </button>
          <h1>Sistema de Cola ATM</h1>
        </div>
        <div className="usuario-info">
          <span>Usuario: <strong>{usuario?.email}</strong></span>
          <button onClick={manejarCerrarSesion} className="boton-salir">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="contenido">
        <div className="ejercicio1-contenedor">
          <section className="seccion-formulario">
            <h2>Agregar Persona a la Cola</h2>
            <form onSubmit={agregarPersona}>
              <div className="grupo-formulario">
                <label htmlFor="nombre">Nombre:</label>
                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  placeholder="Ej: Juan García"
                />
              </div>

              <div className="grupo-formulario">
                <label htmlFor="monto">Monto a Retirar ($):</label>
                <input
                  id="monto"
                  type="number"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder="Ej: 500"
                  min="1"
                />
              </div>

              <button type="submit" className="boton-primario">
                Agregar a la Cola
              </button>
            </form>
          </section>

          <section className="seccion-cola">
            <h2>Estado de la Cola</h2>
            <div className="info-cola">
              <p>Total en cola: <strong>{personas.length}</strong></p>
            </div>

            {personas.length > 0 ? (
              <>
                <div className="proximo-cliente">
                  <h3>Próximo Cliente a Atender:</h3>
                  <div className="tarjeta-cliente">
                    <p><strong>Nombre:</strong> {personas[0].nombre}</p>
                    <p><strong>Monto:</strong> ${personas[0].monto.toFixed(2)}</p>
                    <p><strong>Llegada:</strong> {personas[0].fechaLlegada.toLocaleTimeString('es-ES')}</p>
                  </div>
                  <button onClick={atenderPersona} className="boton-atender">
                    Atender Cliente
                  </button>
                </div>

                <div className="lista-cola">
                  <h3>Resto de la Cola ({personas.length - 1}):</h3>
                  {personas.length > 1 ? (
                    <ul>
                      {personas.slice(1).map((persona, indice) => (
                        <li key={persona.id} className="elemento-cola">
                          <span className="posicion">#{indice + 2}</span>
                          <span className="nombre">{persona.nombre}</span>
                          <span className="monto">${persona.monto.toFixed(2)}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="vacio">Cola vacía después del próximo cliente</p>
                  )}
                </div>
              </>
            ) : (
              <p className="vacio">No hay personas en la cola. ¡Agrega una!</p>
            )}

            <div className="explicacion">
              <h4>¿Cómo funciona?</h4>
              <p>Este es un sistema <strong>FIFO</strong> (First In, First Out). La primera persona que llega es la primera en ser atendida. Es como una cola real de banco.</p>
              <ul>
                <li>Agrega personas al formulario</li>
                <li>Se ordenan automáticamente por hora de llegada</li>
                <li>Haz clic en "Atender Cliente" para procesar</li>
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
