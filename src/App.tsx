import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProveedorAutenticacion } from './contextos/ContextoAutenticacion';
import { RoutaPrivada } from './componentes/RoutaPrivada';
import { PaginaLogin } from './paginas/PaginaLogin';
import { PaginaInicio } from './paginas/PaginaInicio';
import { PaginaEjercicio1 } from './paginas/PaginaEjercicio1';
import { PaginaEjercicio2 } from './paginas/PaginaEjercicio2';
import './App.css';

function App() {
  return (
    <Router>
      <ProveedorAutenticacion>
        <Routes>
          {/* Ruta pública */}
          <Route path="/login" element={<PaginaLogin />} />

          {/* Rutas privadas */}
          <Route
            path="/"
            element={
              <RoutaPrivada>
                <PaginaInicio />
              </RoutaPrivada>
            }
          />
          <Route
            path="/ejercicio1"
            element={
              <RoutaPrivada>
                <PaginaEjercicio1 />
              </RoutaPrivada>
            }
          />
          <Route
            path="/ejercicio2"
            element={
              <RoutaPrivada>
                <PaginaEjercicio2 />
              </RoutaPrivada>
            }
          />

          {/* Ruta por defecto */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </ProveedorAutenticacion>
    </Router>
  );
}

export default App;
