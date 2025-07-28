import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { serviciosService } from '../services/api';

const Servicios = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_servicio', header: 'ID', type: 'number' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'precio', header: 'Precio', type: 'currency' },
    { 
      field: 'categoria', 
      header: 'Categoría',
      type: 'enum',
      options: [
        { value: 'restaurante', label: 'Restaurante', color: 'primary' },
        { value: 'spa', label: 'Spa', color: 'secondary' },
        { value: 'lavanderia', label: 'Lavandería', color: 'info' },
        { value: 'transporte', label: 'Transporte', color: 'warning' },
        { value: 'otros', label: 'Otros', color: 'default' }
      ]
    },
    { 
      field: 'disponibilidad', 
      header: 'Disponibilidad',
      type: 'enum',
      options: [
        { value: '24h', label: '24 Horas', color: 'success' },
        { value: 'diurno', label: 'Diurno', color: 'primary' },
        { value: 'nocturno', label: 'Nocturno', color: 'error' },
        { value: 'horario-limitado', label: 'Horario Limitado', color: 'warning' }
      ]
    }
  ];

  const formFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { 
      name: 'descripcion', 
      label: 'Descripción', 
      type: 'textarea',
      rows: 3
    },
    { name: 'precio', label: 'Precio', type: 'number', required: true },
    {
      name: 'categoria',
      label: 'Categoría',
      type: 'select',
      options: [
        { value: 'restaurante', label: 'Restaurante' },
        { value: 'spa', label: 'Spa' },
        { value: 'lavanderia', label: 'Lavandería' },
        { value: 'transporte', label: 'Transporte' },
        { value: 'otros', label: 'Otros' }
      ]
    },
    {
      name: 'disponibilidad',
      label: 'Disponibilidad',
      type: 'select',
      options: [
        { value: '24h', label: '24 Horas' },
        { value: 'diurno', label: 'Diurno' },
        { value: 'nocturno', label: 'Nocturno' },
        { value: 'horario-limitado', label: 'Horario Limitado' }
      ]
    }
  ];

  const validationSchema = {
    nombre: { required: true, minLength: 2, maxLength: 100 },
    descripcion: { maxLength: 1000 },
    precio: { required: true },
    categoria: { required: false },
    disponibilidad: { required: false }
  };

  const initialFormData = {
    nombre: '',
    descripcion: '',
    precio: '',
    categoria: '',
    disponibilidad: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await serviciosService.getAll();
      setData(response.data);
    } catch (error) {
      showSnackbar('Error al cargar servicios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await serviciosService.create(formData);
      showSnackbar('Servicio agregado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar servicio', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await serviciosService.update(formData.id_servicio, formData);
      showSnackbar('Servicio actualizado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar servicio', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await serviciosService.delete(row.id_servicio);
      showSnackbar('Servicio eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar servicio', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver servicio:', row);
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
        title="Gestión de Servicios"
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

export default Servicios; 