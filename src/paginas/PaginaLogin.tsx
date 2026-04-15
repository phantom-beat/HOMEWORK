import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAutenticacion } from '../contextos/ContextoAutenticacion';

export function PaginaLogin() {
  const [email, setEmail] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();
  const { iniciarSesion, cargando, error, limpiarError } = useAutenticacion();

  const manejarEnvio = async (e: React.FormEvent) => {
    e.preventDefault();
    limpiarError();

    try {
      await iniciarSesion(email, contraseña);
      navigate('/');
    } catch {
      // El error ya se maneja en el estado
    }
  };

  return (
    <div className="contenedor-login">
      <div className="caja-login">
        <h1>Iniciar Sesión</h1>
        
        <form onSubmit={manejarEnvio}>
          <div className="grupo-formulario">
            <label htmlFor="email">Correo Electrónico:</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ej: user@mail.com"
              disabled={cargando}
              required
            />
          </div>

          <div className="grupo-formulario">
            <label htmlFor="contraseña">Contraseña:</label>
            <input
              id="contraseña"
              type="password"
              value={contraseña}
              onChange={(e) => setContraseña(e.target.value)}
              placeholder="Ej: 123"
              disabled={cargando}
              required
            />
          </div>

          {error && <div className="error">{error}</div>}

          <button type="submit" disabled={cargando} className="boton-login">
            {cargando ? 'Validando...' : 'Ingresar'}
          </button>
        </form>

        <div className="ayuda">
          <p><strong>Credenciales de prueba:</strong></p>
          <p>Email: user@mail.com</p>
          <p>Contraseña: 123</p>
        </div>
      </div>
    </div>
  );
}
