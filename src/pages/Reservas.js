import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { reservasService, clientesService, habitacionesService } from '../services/api';

const Reservas = () => {
  const [data, setData] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_reserva', header: 'ID', type: 'number' },
    { field: 'id_cliente', header: 'ID Cliente', type: 'number' },
    { field: 'id_habitacion', header: 'ID Habitación', type: 'number' },
    { field: 'fecha_entrada', header: 'Fecha Entrada', type: 'date' },
    { field: 'fecha_salida', header: 'Fecha Salida', type: 'date' },
    { 
      field: 'estado', 
      header: 'Estado',
      type: 'enum',
      options: [
        { value: 'pendiente', label: 'Pendiente', color: 'warning' },
        { value: 'confirmada', label: 'Confirmada', color: 'success' },
        { value: 'cancelada', label: 'Cancelada', color: 'error' },
        { value: 'completada', label: 'Completada', color: 'info' }
      ]
    },
    { field: 'fecha_reserva', header: 'Fecha Reserva', type: 'date' },
    { field: 'total', header: 'Total', type: 'currency' },
    { field: 'adultos', header: 'Adultos', type: 'number' },
    { field: 'ninos', header: 'Niños', type: 'number' },
    { field: 'notas', header: 'Notas' }
  ];

  const formFields = [
    {
      name: 'id_cliente',
      label: 'Cliente',
      type: 'select',
      options: [],
      required: true
    },
    {
      name: 'id_habitacion',
      label: 'Habitación',
      type: 'select',
      options: [],
      required: true
    },
    { name: 'fecha_entrada', label: 'Fecha Entrada', type: 'date', required: true },
    { name: 'fecha_salida', label: 'Fecha Salida', type: 'date', required: true },
    {
      name: 'estado',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'confirmada', label: 'Confirmada' },
        { value: 'cancelada', label: 'Cancelada' },
        { value: 'completada', label: 'Completada' }
      ],
      required: true
    },
    { name: 'total', label: 'Total', type: 'number' },
    { name: 'adultos', label: 'Adultos', type: 'number', required: true },
    { name: 'ninos', label: 'Niños', type: 'number' },
    { 
      name: 'notas', 
      label: 'Notas', 
      type: 'textarea',
      rows: 3
    }
  ];

  const validationSchema = {
    id_cliente: { required: true },
    id_habitacion: { required: true },
    fecha_entrada: { required: true },
    fecha_salida: { required: true },
    estado: { required: true },
    adultos: { required: true },
    ninos: { required: false }
  };

  const initialFormData = {
    id_cliente: '',
    id_habitacion: '',
    fecha_entrada: '',
    fecha_salida: '',
    estado: '',
    total: '',
    adultos: '',
    ninos: '0',
    notas: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [reservasResponse, clientesResponse, habitacionesResponse] = await Promise.all([
        reservasService.getAll(),
        clientesService.getAll(),
        habitacionesService.getAll()
      ]);
      
      setData(reservasResponse.data);
      
      const clientesOptions = clientesResponse.data.map(cliente => ({
        value: cliente.id_cliente,
        label: `Cliente ${cliente.id_cliente}`
      }));
      
      const habitacionesOptions = habitacionesResponse.data.map(habitacion => ({
        value: habitacion.id_habitacion,
        label: `Habitación ${habitacion.numero_habitacion}`
      }));
      
      setClientes(clientesOptions);
      setHabitaciones(habitacionesOptions);
      
      // Actualizar las opciones del formulario
      formFields.find(field => field.name === 'id_cliente').options = clientesOptions;
      formFields.find(field => field.name === 'id_habitacion').options = habitacionesOptions;
      
    } catch (error) {
      showSnackbar('Error al cargar reservas', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await reservasService.create(formData);
      showSnackbar('Reserva agregada exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar reserva', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await reservasService.update(formData.id_reserva, formData);
      showSnackbar('Reserva actualizada exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar reserva', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await reservasService.delete(row.id_reserva);
      showSnackbar('Reserva eliminada exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar reserva', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver reserva:', row);
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
        title="Gestión de Reservas"
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

export default Reservas; 