import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { pagosService, reservasService } from '../services/api';

const Pagos = () => {
  const [data, setData] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_pago', header: 'ID', type: 'number' },
    { field: 'id_reserva', header: 'ID Reserva', type: 'number' },
    { field: 'monto', header: 'Monto', type: 'currency' },
    { 
      field: 'metodo_pago', 
      header: 'Método Pago',
      type: 'enum',
      options: [
        { value: 'efectivo', label: 'Efectivo', color: 'success' },
        { value: 'tarjeta', label: 'Tarjeta', color: 'primary' },
        { value: 'transferencia', label: 'Transferencia', color: 'info' },
        { value: 'otros', label: 'Otros', color: 'default' }
      ]
    },
    { field: 'fecha_pago', header: 'Fecha Pago', type: 'date' },
    { 
      field: 'estado', 
      header: 'Estado',
      type: 'enum',
      options: [
        { value: 'pendiente', label: 'Pendiente', color: 'warning' },
        { value: 'completado', label: 'Completado', color: 'success' },
        { value: 'reembolsado', label: 'Reembolsado', color: 'info' },
        { value: 'fallido', label: 'Fallido', color: 'error' }
      ]
    },
    { field: 'transaccion_id', header: 'ID Transacción' }
  ];

  const formFields = [
    {
      name: 'id_reserva',
      label: 'Reserva',
      type: 'select',
      options: [],
      required: true
    },
    { name: 'monto', label: 'Monto', type: 'number', required: true },
    {
      name: 'metodo_pago',
      label: 'Método Pago',
      type: 'select',
      options: [
        { value: 'efectivo', label: 'Efectivo' },
        { value: 'tarjeta', label: 'Tarjeta' },
        { value: 'transferencia', label: 'Transferencia' },
        { value: 'otros', label: 'Otros' }
      ],
      required: true
    },
    {
      name: 'estado',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'completado', label: 'Completado' },
        { value: 'reembolsado', label: 'Reembolsado' },
        { value: 'fallido', label: 'Fallido' }
      ],
      required: true
    },
    { name: 'transaccion_id', label: 'ID Transacción', type: 'text' }
  ];

  const validationSchema = {
    id_reserva: { required: true },
    monto: { required: true },
    metodo_pago: { required: true },
    estado: { required: true },
    transaccion_id: { maxLength: 100 }
  };

  const initialFormData = {
    id_reserva: '',
    monto: '',
    metodo_pago: '',
    estado: '',
    transaccion_id: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [pagosResponse, reservasResponse] = await Promise.all([
        pagosService.getAll(),
        reservasService.getAll()
      ]);
      
      setData(pagosResponse.data);
      
      const reservasOptions = reservasResponse.data.map(reserva => ({
        value: reserva.id_reserva,
        label: `Reserva ${reserva.id_reserva} - Habitación ${reserva.id_habitacion}`
      }));
      
      setReservas(reservasOptions);
      
      // Actualizar las opciones del formulario
      formFields.find(field => field.name === 'id_reserva').options = reservasOptions;
      
    } catch (error) {
      showSnackbar('Error al cargar pagos', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await pagosService.create(formData);
      showSnackbar('Pago agregado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar pago', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await pagosService.update(formData.id_pago, formData);
      showSnackbar('Pago actualizado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar pago', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await pagosService.delete(row.id_pago);
      showSnackbar('Pago eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar pago', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver pago:', row);
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
        title="Gestión de Pagos"
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

export default Pagos; 