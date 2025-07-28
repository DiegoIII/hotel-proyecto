import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { comentariosService, clientesService, reservasService } from '../services/api';

const Comentarios = () => {
  const [data, setData] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_comentario', header: 'ID', type: 'number' },
    { field: 'id_cliente', header: 'ID Cliente', type: 'number' },
    { field: 'id_reserva', header: 'ID Reserva', type: 'number' },
    { field: 'calificacion', header: 'Calificación', type: 'number' },
    { field: 'comentario', header: 'Comentario' },
    { field: 'fecha', header: 'Fecha', type: 'date' },
    { field: 'respuesta', header: 'Respuesta' },
    { field: 'fecha_respuesta', header: 'Fecha Respuesta', type: 'date' }
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
      name: 'id_reserva',
      label: 'Reserva',
      type: 'select',
      options: [],
      required: false
    },
    { name: 'calificacion', label: 'Calificación', type: 'number', required: true },
    { 
      name: 'comentario', 
      label: 'Comentario', 
      type: 'textarea',
      rows: 3
    },
    { 
      name: 'respuesta', 
      label: 'Respuesta', 
      type: 'textarea',
      rows: 3
    },
    { name: 'fecha_respuesta', label: 'Fecha Respuesta', type: 'date' }
  ];

  const validationSchema = {
    id_cliente: { required: true },
    id_reserva: { required: false },
    calificacion: { required: true, minLength: 1, maxLength: 5 },
    comentario: { maxLength: 1000 },
    respuesta: { maxLength: 1000 },
    fecha_respuesta: { required: false }
  };

  const initialFormData = {
    id_cliente: '',
    id_reserva: '',
    calificacion: '',
    comentario: '',
    respuesta: '',
    fecha_respuesta: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [comentariosResponse, clientesResponse, reservasResponse] = await Promise.all([
        comentariosService.getAll(),
        clientesService.getAll(),
        reservasService.getAll()
      ]);
      
      setData(comentariosResponse.data);
      
      const clientesOptions = clientesResponse.data.map(cliente => ({
        value: cliente.id_cliente,
        label: `Cliente ${cliente.id_cliente}`
      }));
      
      const reservasOptions = reservasResponse.data.map(reserva => ({
        value: reserva.id_reserva,
        label: `Reserva ${reserva.id_reserva} - Habitación ${reserva.id_habitacion}`
      }));
      
      setClientes(clientesOptions);
      setReservas(reservasOptions);
      
      // Actualizar las opciones del formulario
      formFields.find(field => field.name === 'id_cliente').options = clientesOptions;
      formFields.find(field => field.name === 'id_reserva').options = reservasOptions;
      
    } catch (error) {
      showSnackbar('Error al cargar comentarios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await comentariosService.create(formData);
      showSnackbar('Comentario agregado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar comentario', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await comentariosService.update(formData.id_comentario, formData);
      showSnackbar('Comentario actualizado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar comentario', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await comentariosService.delete(row.id_comentario);
      showSnackbar('Comentario eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar comentario', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver comentario:', row);
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
        title="Gestión de Comentarios"
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

export default Comentarios; 