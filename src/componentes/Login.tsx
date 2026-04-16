import { useState } from 'react';
import { crearCuenta, iniciarSesion } from '../servicios/firebase';
import '../estilos/login.css';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [modo, setModo] = useState<'login' | 'registro'>('login');
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setCargando(true);

    try {
      if (modo === 'registro') {
        await crearCuenta(correo, contrasena);
      } else {
        await iniciarSesion(correo, contrasena);
      }
      onLogin();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error de autenticación');
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="contenedor-login">
      <div className="caja-login">
        <h1>Gestor de Archivos</h1>
        <form onSubmit={manejarEnvio}>
          <input
            type="email"
            placeholder="Correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />
          <button type="submit" disabled={cargando}>
            {cargando ? 'Procesando...' : modo === 'login' ? 'Iniciar Sesión' : 'Registrarse'}
          </button>
        </form>
        
        {error && <p className="error">{error}</p>}
        
        <p className="alternar">
          {modo === 'login' ? '¿No tienes cuenta?' : '¿Ya tienes cuenta?'}
          <button 
            type="button"
            onClick={() => setModo(modo === 'login' ? 'registro' : 'login')}
            className="enlace"
          >
            {modo === 'login' ? 'Registrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
}
