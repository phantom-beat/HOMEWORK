import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';

export function PaginaEjercicio2() {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAutenticacion();
  const [contador, setContador] = useState(0);
  const [historial, setHistorial] = useState<number[]>([0]);

  const incrementar = () => {
    const nuevoValor = contador + 1;
    setContador(nuevoValor);
    setHistorial([...historial, nuevoValor]);
  };

  const decrementar = () => {
    const nuevoValor = contador - 1;
    setContador(nuevoValor);
    setHistorial([...historial, nuevoValor]);
  };

  const incrementarPorDiez = () => {
    const nuevoValor = contador + 10;
    setContador(nuevoValor);
    setHistorial([...historial, nuevoValor]);
  };

  const reiniciar = () => {
    setContador(0);
    setHistorial([0]);
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
          <h1>Contador Interactivo</h1>
        </div>
        <div className="usuario-info">
          <span>Usuario: <strong>{usuario?.email}</strong></span>
          <button onClick={manejarCerrarSesion} className="boton-salir">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="contenido">
        <div className="ejercicio2-contenedor">
          <section className="seccion-contador">
            <h2>Contador con Estado</h2>
            
            <div className="display-contador">
              <div className="numero">
                {contador}
              </div>
            </div>

            <div className="controles">
              <button onClick={decrementar} className="boton-control">
                − Disminuir
              </button>
              <button onClick={reiniciar} className="boton-reset">
                ⟲ Reiniciar
              </button>
              <button onClick={incrementar} className="boton-control">
                Aumentar +
              </button>
            </div>

            <div className="control-adicional">
              <button onClick={incrementarPorDiez} className="boton-adicional">
                Aumentar +10
              </button>
            </div>

            <div className="explicacion">
              <h4>¿Cómo funciona?</h4>
              <p>Este es un ejemplo simple de <strong>manejo de estado</strong> en React usando el hook <code>useState</code>.</p>
              <ul>
                <li>El estado se actualiza con cada click</li>
                <li>El componente se re-renderiza automáticamente</li>
                <li>El historial mantiene registro de todos los cambios</li>
                <li>Es útil para entender cómo React gestiona datos reactivos</li>
              </ul>
            </div>
          </section>

          <section className="seccion-historial">
            <h2>Historial de Cambios</h2>
            <div className="lista-historial">
              {historial.map((valor, indice) => (
                <div key={indice} className="elemento-historial">
                  <span className="paso">Paso {indice + 1}:</span>
                  <span className="valor">{valor}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
