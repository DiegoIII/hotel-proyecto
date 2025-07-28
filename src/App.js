import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions
} from '@mui/material';
import {
  People as PeopleIcon,
  Hotel as HotelIcon,
  BookOnline as BookOnlineIcon,
  Restaurant as RestaurantIcon,
  Payment as PaymentIcon,
  Inventory as InventoryIcon,
  Build as BuildIcon,
  Comment as CommentIcon,
  Home as HomeIcon
} from '@mui/icons-material';

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
  const menuItems = [
    { text: 'Inicio', icon: <HomeIcon />, path: '/' },
    { text: 'Usuarios', icon: <PeopleIcon />, path: '/usuarios' },
    { text: 'Empleados', icon: <PeopleIcon />, path: '/empleados' },
    { text: 'Clientes', icon: <PeopleIcon />, path: '/clientes' },
    { text: 'Habitaciones', icon: <HotelIcon />, path: '/habitaciones' },
    { text: 'Tipos de Habitación', icon: <HotelIcon />, path: '/tipos-habitacion' },
    { text: 'Reservas', icon: <BookOnlineIcon />, path: '/reservas' },
    { text: 'Servicios', icon: <RestaurantIcon />, path: '/servicios' },
    { text: 'Reserva Servicios', icon: <RestaurantIcon />, path: '/reserva-servicios' },
    { text: 'Pagos', icon: <PaymentIcon />, path: '/pagos' },
    { text: 'Inventario', icon: <InventoryIcon />, path: '/inventario' },
    { text: 'Mantenimiento', icon: <BuildIcon />, path: '/mantenimiento' },
    { text: 'Comentarios', icon: <CommentIcon />, path: '/comentarios' },
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                🏨 Fiesta Americana Acapulco Villas
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {menuItems.map((item) => (
                  <Button
                    key={item.text}
                    color="inherit"
                    startIcon={item.icon}
                    component="a"
                    href={item.path}
                    sx={{ 
                      fontSize: '0.8rem',
                      minWidth: 'auto',
                      px: 1
                    }}
                  >
                    {item.text}
                  </Button>
                ))}
              </Box>
            </Toolbar>
          </AppBar>
          
          <Container maxWidth="xl" sx={{ mt: 3, mb: 3 }}>
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
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
