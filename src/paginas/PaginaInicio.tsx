import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';

export function PaginaInicio() {
  const navigate = useNavigate();
  const { usuario, cerrarSesion } = useAutenticacion();

  const manejarCerrarSesion = () => {
    cerrarSesion();
    navigate('/login');
  };

  return (
    <div className="contenedor-pagina">
      <header className="encabezado">
        <h1>Bienvenido</h1>
        <div className="usuario-info">
          <span>Usuario: <strong>{usuario?.email}</strong></span>
          <button onClick={manejarCerrarSesion} className="boton-salir">
            Cerrar Sesión
          </button>
        </div>
      </header>

      <main className="contenido">
        <h2>Selecciona un Ejercicio</h2>
        
        <div className="ejercicios">
          <div className="tarjeta-ejercicio" onClick={() => navigate('/ejercicio1')}>
            <h3>Ejercicio 1: Sistema de Cola ATM</h3>
            <p>Gestiona una cola de personas en un cajero automático con estructura FIFO.</p>
            <button className="boton-acceder">Acceder →</button>
          </div>

          <div className="tarjeta-ejercicio" onClick={() => navigate('/ejercicio2')}>
            <h3>Ejercicio 2: Contador Interactivo</h3>
            <p>Un contador simple para demostrar el manejo de estado en React.</p>
            <button className="boton-acceder">Acceder →</button>
          </div>
        </div>
      </main>
    </div>
  );
}
