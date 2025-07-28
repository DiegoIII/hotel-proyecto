import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { habitacionesService, tiposHabitacionService } from '../services/api';

const Habitaciones = () => {
  const [data, setData] = useState([]);
  const [tiposHabitacion, setTiposHabitacion] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_habitacion', header: 'ID', type: 'number' },
    { field: 'numero_habitacion', header: 'Número Habitación' },
    { field: 'id_tipo_habitacion', header: 'ID Tipo Habitación', type: 'number' },
    { field: 'piso', header: 'Piso', type: 'number' },
    { 
      field: 'estado', 
      header: 'Estado',
      type: 'enum',
      options: [
        { value: 'disponible', label: 'Disponible', color: 'success' },
        { value: 'ocupada', label: 'Ocupada', color: 'error' },
        { value: 'mantenimiento', label: 'Mantenimiento', color: 'warning' },
        { value: 'reservada', label: 'Reservada', color: 'info' }
      ]
    },
    { 
      field: 'ultima_limpieza', 
      header: 'Última Limpieza',
      type: 'date'
    },
    { field: 'notas', header: 'Notas' }
  ];

  const formFields = [
    { name: 'numero_habitacion', label: 'Número Habitación', type: 'text', required: true },
    {
      name: 'id_tipo_habitacion',
      label: 'Tipo Habitación',
      type: 'select',
      options: [],
      required: true
    },
    { name: 'piso', label: 'Piso', type: 'number', required: true },
    {
      name: 'estado',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'disponible', label: 'Disponible' },
        { value: 'ocupada', label: 'Ocupada' },
        { value: 'mantenimiento', label: 'Mantenimiento' },
        { value: 'reservada', label: 'Reservada' }
      ],
      required: true
    },
    { name: 'ultima_limpieza', label: 'Última Limpieza', type: 'date' },
    { 
      name: 'notas', 
      label: 'Notas', 
      type: 'textarea',
      rows: 3
    }
  ];

  const validationSchema = {
    numero_habitacion: { required: true, minLength: 1, maxLength: 10 },
    id_tipo_habitacion: { required: true },
    piso: { required: true },
    estado: { required: true },
    ultima_limpieza: { required: false },
    notas: { maxLength: 1000 }
  };

  const initialFormData = {
    numero_habitacion: '',
    id_tipo_habitacion: '',
    piso: '',
    estado: '',
    ultima_limpieza: '',
    notas: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [habitacionesResponse, tiposResponse] = await Promise.all([
        habitacionesService.getAll(),
        tiposHabitacionService.getAll()
      ]);
      
      setData(habitacionesResponse.data);
      
      const tiposOptions = tiposResponse.data.map(tipo => ({
        value: tipo.id_tipo_habitacion,
        label: `${tipo.nombre} - $${tipo.precio_noche}/noche`
      }));
      
      setTiposHabitacion(tiposOptions);
      
      // Actualizar las opciones del formulario
      formFields.find(field => field.name === 'id_tipo_habitacion').options = tiposOptions;
      
    } catch (error) {
      showSnackbar('Error al cargar habitaciones', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await habitacionesService.create(formData);
      showSnackbar('Habitación agregada exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar habitación', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await habitacionesService.update(formData.id_habitacion, formData);
      showSnackbar('Habitación actualizada exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar habitación', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await habitacionesService.delete(row.id_habitacion);
      showSnackbar('Habitación eliminada exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar habitación', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver habitación:', row);
    // Aquí puedes implementar una vista detallada
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <>
      <DataTable
        title="Gestión de Habitaciones"
        columns={columns}
        data={data}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onView={handleView}
        formFields={formFields}
        initialFormData={initialFormData}
        validationSchema={validationSchema}
      />
      
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Habitaciones; 