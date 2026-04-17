import { useState } from 'react';
import { BarraLateral } from './BarraLateral';
import { arbolMenu } from './datos';
import type { ElementoMenu } from './tipos';
import './App.css';

function App() {
  const [elementoSeleccionado, setElementoSeleccionado] = useState<ElementoMenu | null>(null);

  const manejarSeleccion = (elemento: ElementoMenu) => {
    setElementoSeleccionado(elemento);
  };

  const ComponenteActual = elementoSeleccionado?.componente;

  return (
    <div className="contenedor-principal">
      <BarraLateral elementos={arbolMenu} alSeleccionar={manejarSeleccion} />
      <main className="contenido-principal">
        <div className="encabezado">
          <h1>{elementoSeleccionado?.titulo || 'Bienvenido'}</h1>
        </div>
        <section className="seccion-contenido">
          {ComponenteActual && <ComponenteActual />}
        </section>
      </main>
    </div>
  );
}

export default App;
