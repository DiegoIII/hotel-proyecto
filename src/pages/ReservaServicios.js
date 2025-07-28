import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { reservaServiciosService, reservasService, serviciosService } from '../services/api';

const ReservaServicios = () => {
  const [data, setData] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [servicios, setServicios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_reserva_servicio', header: 'ID', type: 'number' },
    { field: 'id_reserva', header: 'ID Reserva', type: 'number' },
    { field: 'id_servicio', header: 'ID Servicio', type: 'number' },
    { field: 'fecha_servicio', header: 'Fecha Servicio', type: 'date' },
    { field: 'cantidad', header: 'Cantidad', type: 'number' },
    { 
      field: 'estado', 
      header: 'Estado',
      type: 'enum',
      options: [
        { value: 'pendiente', label: 'Pendiente', color: 'warning' },
        { value: 'completado', label: 'Completado', color: 'success' },
        { value: 'cancelado', label: 'Cancelado', color: 'error' }
      ]
    },
    { field: 'notas', header: 'Notas' }
  ];

  const formFields = [
    {
      name: 'id_reserva',
      label: 'Reserva',
      type: 'select',
      options: [],
      required: true
    },
    {
      name: 'id_servicio',
      label: 'Servicio',
      type: 'select',
      options: [],
      required: true
    },
    { name: 'fecha_servicio', label: 'Fecha Servicio', type: 'date', required: true },
    { name: 'cantidad', label: 'Cantidad', type: 'number' },
    {
      name: 'estado',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'completado', label: 'Completado' },
        { value: 'cancelado', label: 'Cancelado' }
      ]
    },
    { 
      name: 'notas', 
      label: 'Notas', 
      type: 'textarea',
      rows: 3
    }
  ];

  const validationSchema = {
    id_reserva: { required: true },
    id_servicio: { required: true },
    fecha_servicio: { required: true },
    cantidad: { required: false },
    estado: { required: false },
    notas: { maxLength: 1000 }
  };

  const initialFormData = {
    id_reserva: '',
    id_servicio: '',
    fecha_servicio: '',
    cantidad: '1',
    estado: '',
    notas: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [reservaServiciosResponse, reservasResponse, serviciosResponse] = await Promise.all([
        reservaServiciosService.getAll(),
        reservasService.getAll(),
        serviciosService.getAll()
      ]);
      
      setData(reservaServiciosResponse.data);
      
      const reservasOptions = reservasResponse.data.map(reserva => ({
        value: reserva.id_reserva,
        label: `Reserva ${reserva.id_reserva} - Habitación ${reserva.id_habitacion}`
      }));
      
      const serviciosOptions = serviciosResponse.data.map(servicio => ({
        value: servicio.id_servicio,
        label: `${servicio.nombre} - $${servicio.precio}`
      }));
      
      setReservas(reservasOptions);
      setServicios(serviciosOptions);
      
      // Actualizar las opciones del formulario
      formFields.find(field => field.name === 'id_reserva').options = reservasOptions;
      formFields.find(field => field.name === 'id_servicio').options = serviciosOptions;
      
    } catch (error) {
      showSnackbar('Error al cargar reserva servicios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await reservaServiciosService.create(formData);
      showSnackbar('Reserva servicio agregada exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar reserva servicio', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await reservaServiciosService.update(formData.id_reserva_servicio, formData);
      showSnackbar('Reserva servicio actualizada exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar reserva servicio', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await reservaServiciosService.delete(row.id_reserva_servicio);
      showSnackbar('Reserva servicio eliminada exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar reserva servicio', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver reserva servicio:', row);
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
        title="Gestión de Reserva Servicios"
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

export default ReservaServicios; 