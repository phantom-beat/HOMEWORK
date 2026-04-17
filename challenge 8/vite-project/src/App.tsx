import { useState, useRef } from 'react';
import Tree from 'react-d3-tree';
import { Arbol, NodoArbol } from './Arbol';
import './App.css';

function App() {
  const arbolRef = useRef<Arbol>(new Arbol());
  const [, setActualizar] = useState(0);
  const [nuevoValor, setNuevoValor] = useState('');
  const [valorbusqueda, setValorBusqueda] = useState('');
  const [resultadoBusqueda, setResultadoBusqueda] = useState<boolean | null>(null);
  const [recorridos, setRecorridos] = useState({
    inorden: [] as number[],
    preorden: [] as number[],
    postorden: [] as number[]
  });

  const inicializarArbol = () => {
    if (arbolRef.current.raiz === null) {
      const valores = [50, 30, 70, 20, 40, 60, 80];
      valores.forEach(v => arbolRef.current.insertar(v));
      actualizarRecorridos();
      setActualizar(prev => prev + 1);
    }
  };

  const actualizarRecorridos = () => {
    setRecorridos({
      inorden: arbolRef.current.inorden(),
      preorden: arbolRef.current.preorden(),
      postorden: arbolRef.current.postorden()
    });
  };

  const agregarNodo = () => {
    const valor = parseInt(nuevoValor);
    if (!isNaN(valor)) {
      arbolRef.current.insertar(valor);
      setNuevoValor('');
      actualizarRecorridos();
      setActualizar(prev => prev + 1);
    }
  };

  const buscar = () => {
    const valor = parseInt(valorbusqueda);
    if (!isNaN(valor)) {
      const resultado = arbolRef.current.buscar(valor);
      setResultadoBusqueda(resultado);
    }
  };

  return (
    <div style={estilos.contenedor}>
      <h1>Árbol Binario de Búsqueda</h1>

      <div style={estilos.seccion}>
        <button onClick={inicializarArbol} style={estilos.boton}>
          Inicializar Árbol
        </button>
      </div>

      <div style={estilos.seccion}>
        <input
          type="number"
          value={nuevoValor}
          onChange={(e) => setNuevoValor(e.target.value)}
          placeholder="Ingrese un número"
          onKeyPress={(e) => e.key === 'Enter' && agregarNodo()}
          style={estilos.input}
        />
        <button onClick={agregarNodo} style={estilos.boton}>
          Agregar Nodo
        </button>
      </div>

      <div style={estilos.seccion}>
        <input
          type="number"
          value={valorbusqueda}
          onChange={(e) => setValorBusqueda(e.target.value)}
          placeholder="Buscar valor"
          onKeyPress={(e) => e.key === 'Enter' && buscar()}
          style={estilos.input}
        />
        <button onClick={buscar} style={estilos.boton}>
          Buscar
        </button>
        {resultadoBusqueda !== null && (
          <p style={estilos.resultado}>
            {resultadoBusqueda ? '✓ Encontrado' : '✗ No encontrado'}
          </p>
        )}
      </div>

      {arbolRef.current.raiz && (
        <div style={estilos.visualizacion}>
          <Tree
            data={arbolRef.current.obtenerDatos()}
            orientation="vertical"
            nodeSize={{ x: 100, y: 100 }}
            separation={{ siblings: 1.5, nonSiblings: 2 }}
          />
        </div>
      )}

      <div style={estilos.recorridos}>
        <div>
          <p><strong>Inorden:</strong> {recorridos.inorden.join(', ')}</p>
        </div>
        <div>
          <p><strong>Preorden:</strong> {recorridos.preorden.join(', ')}</p>
        </div>
        <div>
          <p><strong>Postorden:</strong> {recorridos.postorden.join(', ')}</p>
        </div>
      </div>
    </div>
  );
}

const estilos = {
  contenedor: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  seccion: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center'
  },
  input: {
    padding: '8px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '4px'
  },
  boton: {
    padding: '8px 16px',
    fontSize: '14px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  resultado: {
    marginLeft: '10px',
    fontSize: '14px'
  },
  visualizacion: {
    border: '1px solid #ddd',
    borderRadius: '4px',
    height: '400px',
    marginBottom: '20px',
    overflow: 'auto'
  },
  recorridos: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '15px',
    marginTop: '20px'
  }
};

export default App;
