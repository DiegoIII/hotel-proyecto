import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  Container,
  Box
} from '@mui/material';

// Importar componentes
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Importar páginas
import Bienvenida from './pages/Bienvenida';
import Usuarios from './pages/Usuarios';
import Empleados from './pages/Empleados';
import Clientes from './pages/Clientes';
import Habitaciones from './pages/Habitaciones';
import TiposHabitacion from './pages/TiposHabitacion';
import Reservas from './pages/Reservas';
import Servicios from './pages/Servicios';
import ReservaServicios from './pages/ReservaServicios';
import Pagos from './pages/Pagos';
import Inventario from './pages/Inventario';
import Mantenimiento from './pages/Mantenimiento';
import Comentarios from './pages/Comentarios';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh' 
        }}>
          <Navbar />
          
          <Container maxWidth="xl" sx={{ 
            mt: 3, 
            mb: 3, 
            flex: 1 
          }}>
            <Routes>
              <Route path="/" element={<Bienvenida />} />
              <Route path="/usuarios" element={<Usuarios />} />
              <Route path="/empleados" element={<Empleados />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/habitaciones" element={<Habitaciones />} />
              <Route path="/tipos-habitacion" element={<TiposHabitacion />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/reserva-servicios" element={<ReservaServicios />} />
              <Route path="/pagos" element={<Pagos />} />
              <Route path="/inventario" element={<Inventario />} />
              <Route path="/mantenimiento" element={<Mantenimiento />} />
              <Route path="/comentarios" element={<Comentarios />} />
            </Routes>
          </Container>
          
          <Footer />
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
