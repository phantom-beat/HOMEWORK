import { useState } from 'react';
import type { Nodo } from '../tipos/nodo';
import '../estilos/navegador.css';

interface NavegadorProps {
  arbol: Nodo;
  correoUsuario: string;
  onCrear: (nombre: string, tipo: 'carpeta' | 'archivo', idPadre: string) => void;
  onEliminar: (id: string) => void;
  onRenombrar?: (id: string, nuevoNombre: string) => void;
}

export default function Navegador({ arbol, correoUsuario, onCrear, onEliminar }: NavegadorProps) {
  const [expandidos, setExpandidos] = useState<Set<string>>(new Set(['raiz']));
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [tipoNuevo, setTipoNuevo] = useState<'carpeta' | 'archivo'>('carpeta');
  const [idPadreActual, setIdPadreActual] = useState('raiz');

  const alternarExpansion = (id: string) => {
    const nuevos = new Set(expandidos);
    if (nuevos.has(id)) nuevos.delete(id);
    else nuevos.add(id);
    setExpandidos(nuevos);
  };

  const manejarCrear = () => {
    if (nombreNuevo.trim()) {
      onCrear(nombreNuevo, tipoNuevo, idPadreActual);
      setNombreNuevo('');
    }
  };

  const renderizarNodo = (nodo: Nodo, nivel: number) => {
    const esExpandido = expandidos.has(nodo.id);
    const tieneHijos = nodo.hijos && nodo.hijos.length > 0;
    const esSeleccionado = nodo.id === idPadreActual;

    return (
      <div key={nodo.id} className="nodo">
        <div 
          className={`item-nodo ${esSeleccionado ? 'seleccionado' : ''}`}
          style={{ paddingLeft: `${nivel * 20}px` }}
        >
          {tieneHijos && (
            <button 
              className="boton-expandir"
              onClick={() => alternarExpansion(nodo.id)}
            >
              {esExpandido ? '▼' : '▶'}
            </button>
          )}
          {!tieneHijos && <span className="espacio-boton"></span>}
          
          <span className="icono">{nodo.tipo === 'carpeta' ? '📁' : '📄'}</span>
          <span className="nombre">{nodo.nombre}</span>
          
          {nodo.tipo === 'carpeta' && (
            <button 
              className="boton-accion crear"
              onClick={() => setIdPadreActual(nodo.id)}
            >
              +
            </button>
          )}
          {nodo.id !== 'raiz' && (
            <button 
              className="boton-accion eliminar"
              onClick={() => onEliminar(nodo.id)}
            >
              ✕
            </button>
          )}
        </div>
        
        {esExpandido && tieneHijos && (
          <div className="hijos">
            {nodo.hijos!.map((hijo) => renderizarNodo(hijo, nivel + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="navegador">
      <div className="panel-superior">
        <h2>Bienvenido: {correoUsuario}</h2>
      </div>
      
      <div className="area-formulario">
        <input
          type="text"
          placeholder="Nombre del elemento"
          value={nombreNuevo}
          onChange={(e) => setNombreNuevo(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && manejarCrear()}
        />
        
        <select value={tipoNuevo} onChange={(e) => setTipoNuevo(e.target.value as 'carpeta' | 'archivo')}>
          <option value="carpeta">📁 Carpeta</option>
          <option value="archivo">📄 Archivo</option>
        </select>
        
        <button onClick={manejarCrear} className="boton-crear">Crear</button>
      </div>

      <div className="arbol">
        {renderizarNodo(arbol, 0)}
      </div>
    </div>
  );
}
