import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Servicios para cada entidad
export const usuariosService = {
  getAll: () => api.get('/usuarios'),
  getById: (id) => api.get(`/usuarios/${id}`),
  create: (data) => api.post('/usuarios', data),
  update: (id, data) => api.put(`/usuarios/${id}`, data),
  delete: (id) => api.delete(`/usuarios/${id}`),
};

export const empleadosService = {
  getAll: () => api.get('/empleados'),
  getById: (id) => api.get(`/empleados/${id}`),
  create: (data) => api.post('/empleados', data),
  update: (id, data) => api.put(`/empleados/${id}`, data),
  delete: (id) => api.delete(`/empleados/${id}`),
};

export const clientesService = {
  getAll: () => api.get('/clientes'),
  getById: (id) => api.get(`/clientes/${id}`),
  create: (data) => api.post('/clientes', data),
  update: (id, data) => api.put(`/clientes/${id}`, data),
  delete: (id) => api.delete(`/clientes/${id}`),
};

export const habitacionesService = {
  getAll: () => api.get('/habitaciones'),
  getById: (id) => api.get(`/habitaciones/${id}`),
  create: (data) => api.post('/habitaciones', data),
  update: (id, data) => api.put(`/habitaciones/${id}`, data),
  delete: (id) => api.delete(`/habitaciones/${id}`),
};

export const tiposHabitacionService = {
  getAll: () => api.get('/tipos-habitacion'),
  getById: (id) => api.get(`/tipos-habitacion/${id}`),
  create: (data) => api.post('/tipos-habitacion', data),
  update: (id, data) => api.put(`/tipos-habitacion/${id}`, data),
  delete: (id) => api.delete(`/tipos-habitacion/${id}`),
};

export const reservasService = {
  getAll: () => api.get('/reservas'),
  getById: (id) => api.get(`/reservas/${id}`),
  create: (data) => api.post('/reservas', data),
  update: (id, data) => api.put(`/reservas/${id}`, data),
  delete: (id) => api.delete(`/reservas/${id}`),
};

export const serviciosService = {
  getAll: () => api.get('/servicios'),
  getById: (id) => api.get(`/servicios/${id}`),
  create: (data) => api.post('/servicios', data),
  update: (id, data) => api.put(`/servicios/${id}`, data),
  delete: (id) => api.delete(`/servicios/${id}`),
};

export const reservaServiciosService = {
  getAll: () => api.get('/reserva-servicios'),
  getById: (id) => api.get(`/reserva-servicios/${id}`),
  create: (data) => api.post('/reserva-servicios', data),
  update: (id, data) => api.put(`/reserva-servicios/${id}`, data),
  delete: (id) => api.delete(`/reserva-servicios/${id}`),
};

export const pagosService = {
  getAll: () => api.get('/pagos'),
  getById: (id) => api.get(`/pagos/${id}`),
  create: (data) => api.post('/pagos', data),
  update: (id, data) => api.put(`/pagos/${id}`, data),
  delete: (id) => api.delete(`/pagos/${id}`),
};

export const inventarioService = {
  getAll: () => api.get('/inventario'),
  getById: (id) => api.get(`/inventario/${id}`),
  create: (data) => api.post('/inventario', data),
  update: (id, data) => api.put(`/inventario/${id}`, data),
  delete: (id) => api.delete(`/inventario/${id}`),
};

export const mantenimientoService = {
  getAll: () => api.get('/mantenimiento'),
  getById: (id) => api.get(`/mantenimiento/${id}`),
  create: (data) => api.post('/mantenimiento', data),
  update: (id, data) => api.put(`/mantenimiento/${id}`, data),
  delete: (id) => api.delete(`/mantenimiento/${id}`),
};

export const comentariosService = {
  getAll: () => api.get('/comentarios'),
  getById: (id) => api.get(`/comentarios/${id}`),
  create: (data) => api.post('/comentarios', data),
  update: (id, data) => api.put(`/comentarios/${id}`, data),
  delete: (id) => api.delete(`/comentarios/${id}`),
};

export default api; 