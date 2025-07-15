import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Clientes from './pages/Clientes';
import Empleados from './pages/Empleados';
import Habitaciones from './pages/Habitaciones';
import Reservas from './pages/Reservas';
import Servicios from './pages/Servicios';
import Pagos from './pages/Pagos';
import Inventario from './pages/Inventario';
import Mantenimiento from './pages/Mantenimiento';
import Comentarios from './pages/Comentarios';
import TiposHabitacion from './pages/TiposHabitacion';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Hotel</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item"><Link className="nav-link" to="/">Dashboard</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/clientes">Clientes</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/empleados">Empleados</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/habitaciones">Habitaciones</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/reservas">Reservas</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/servicios">Servicios</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/pagos">Pagos</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/inventario">Inventario</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/mantenimiento">Mantenimiento</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/comentarios">Comentarios</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/tipos-habitacion">Tipos de Habitación</Link></li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<h2>Dashboard</h2>} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/empleados" element={<Empleados />} />
          <Route path="/habitaciones" element={<Habitaciones />} />
          <Route path="/reservas" element={<Reservas />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/pagos" element={<Pagos />} />
          <Route path="/inventario" element={<Inventario />} />
          <Route path="/mantenimiento" element={<Mantenimiento />} />
          <Route path="/comentarios" element={<Comentarios />} />
          <Route path="/tipos-habitacion" element={<TiposHabitacion />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
