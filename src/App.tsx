import { useEffect, useState } from 'react';
import type { User } from 'firebase/auth';
import Login from './componentes/Login';
import Navegador from './componentes/Navegador';
import { observarAutenticacion, cerrarSesion, guardarArbol, obtenerArbol } from './servicios/firebase';
import { Arbol } from './servicios/arbol';
import './App.css';

function App() {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [arbol, setArbol] = useState<Arbol>(new Arbol());
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const desuscribir = observarAutenticacion(async (usuarioFirebase) => {
      setUsuario(usuarioFirebase);
      
      if (usuarioFirebase) {
        const snapshot = await obtenerArbol(usuarioFirebase.uid);
        if (snapshot.exists()) {
          const nuevoArbol = new Arbol();
          nuevoArbol.deserializar(snapshot.val());
          setArbol(nuevoArbol);
        } else {
          const nuevoArbol = new Arbol();
          setArbol(nuevoArbol);
          await guardarArbol(usuarioFirebase.uid, nuevoArbol.serializar());
        }
      }
      
      setCargando(false);
    });

    return () => desuscribir();
  }, []);

  const manejarCrear = async (nombre: string, tipo: 'carpeta' | 'archivo', idPadre: string) => {
    if (!usuario?.email) return;

    try {
      arbol.crearNodo(nombre, tipo, usuario.email, idPadre);
      setArbol(new Arbol());
      setArbol((arbolActual) => {
        arbolActual.raiz = arbol.raiz;
        return arbolActual;
      });

      if (usuario.uid) {
        await guardarArbol(usuario.uid, arbol.serializar());
      }
    } catch (error) {
      console.error('Error al crear nodo:', error);
    }
  };

  const manejarEliminar = async (id: string) => {
    if (!usuario) return;

    try {
      arbol.eliminarNodo(id);
      setArbol(new Arbol());
      setArbol((arbolActual) => {
        arbolActual.raiz = arbol.raiz;
        return arbolActual;
      });

      if (usuario.uid) {
        await guardarArbol(usuario.uid, arbol.serializar());
      }
    } catch (error) {
      console.error('Error al eliminar nodo:', error);
    }
  };

  const manejarRenombrar = async (id: string, nuevoNombre: string) => {
    if (!usuario) return;

    try {
      arbol.renombrar(id, nuevoNombre);
      setArbol(new Arbol());
      setArbol((arbolActual) => {
        arbolActual.raiz = arbol.raiz;
        return arbolActual;
      });

      if (usuario.uid) {
        await guardarArbol(usuario.uid, arbol.serializar());
      }
    } catch (error) {
      console.error('Error al renombrar:', error);
    }
  };

  const manejarCerrarSesion = async () => {
    try {
      await cerrarSesion();
      setUsuario(null);
      setArbol(new Arbol());
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (cargando) {
    return <div className="cargando">Cargando...</div>;
  }

  if (!usuario) {
    return <Login onLogin={() => {}} />;
  }

  return (
    <div className="aplicacion">
      <Navegador 
        arbol={arbol.raiz}
        correoUsuario={usuario.email || 'Usuario'}
        onCrear={manejarCrear}
        onEliminar={manejarEliminar}
        onRenombrar={manejarRenombrar}
      />
      <button className="boton-cerrar" onClick={manejarCerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
}

export default App;
