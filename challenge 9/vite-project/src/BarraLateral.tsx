import { useState } from 'react';
import type { ElementoMenu } from './tipos';
import './BarraLateral.css';

interface PropiedadesBarraLateral {
  elementos: ElementoMenu[];
  alSeleccionar: (elemento: ElementoMenu) => void;
}

interface PropiedadesElemento {
  elemento: ElementoMenu;
  nivel: number;
  alSeleccionar: (elemento: ElementoMenu) => void;
}

const ItemMenu = ({ elemento, nivel, alSeleccionar }: PropiedadesElemento) => {
  const [expandido, setExpandido] = useState(false);
  const tieneHijos = elemento.hijos && elemento.hijos.length > 0;

  const manejarClick = () => {
    if (tieneHijos) {
      setExpandido(!expandido);
    }
    alSeleccionar(elemento);
  };

  return (
    <div className="item-menu" style={{ marginLeft: `${nivel * 16}px` }}>
      <button
        className={`boton-menu ${expandido ? 'expandido' : ''} ${tieneHijos ? 'con-hijos' : ''}`}
        onClick={manejarClick}
      >
        {tieneHijos && <span className="flecha">{expandido ? '▼' : '▶'}</span>}
        {elemento.titulo}
      </button>
      {expandido && tieneHijos && (
        <div className="submenu">
          {elemento.hijos?.map((hijo) => (
            <ItemMenu
              key={hijo.id}
              elemento={hijo}
              nivel={nivel + 1}
              alSeleccionar={alSeleccionar}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const BarraLateral = ({ elementos, alSeleccionar }: PropiedadesBarraLateral) => {
  return (
    <aside className="barra-lateral">
      <div className="contenedor-menu">
        {elementos.map((elemento) => (
          <ItemMenu
            key={elemento.id}
            elemento={elemento}
            nivel={0}
            alSeleccionar={alSeleccionar}
          />
        ))}
      </div>
    </aside>
  );
};
