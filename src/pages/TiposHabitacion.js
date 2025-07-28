import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { tiposHabitacionService } from '../services/api';

const TiposHabitacion = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_tipo_habitacion', header: 'ID', type: 'number' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'descripcion', header: 'Descripción' },
    { field: 'capacidad', header: 'Capacidad', type: 'number' },
    { 
      field: 'precio_noche', 
      header: 'Precio por Noche',
      type: 'currency'
    },
    { field: 'amenities', header: 'Amenities' },
    { field: 'imagen_url', header: 'URL Imagen' }
  ];

  const formFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { 
      name: 'descripcion', 
      label: 'Descripción', 
      type: 'textarea',
      rows: 3
    },
    { name: 'capacidad', label: 'Capacidad', type: 'number', required: true },
    { name: 'precio_noche', label: 'Precio por Noche', type: 'number', required: true },
    { 
      name: 'amenities', 
      label: 'Amenities', 
      type: 'textarea',
      rows: 3
    },
    { name: 'imagen_url', label: 'URL Imagen', type: 'text' }
  ];

  const validationSchema = {
    nombre: { required: true, minLength: 2, maxLength: 50 },
    descripcion: { maxLength: 1000 },
    capacidad: { required: true },
    precio_noche: { required: true },
    amenities: { maxLength: 1000 },
    imagen_url: { maxLength: 255 }
  };

  const initialFormData = {
    nombre: '',
    descripcion: '',
    capacidad: '',
    precio_noche: '',
    amenities: '',
    imagen_url: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await tiposHabitacionService.getAll();
      setData(response.data);
    } catch (error) {
      showSnackbar('Error al cargar tipos de habitación', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await tiposHabitacionService.create(formData);
      showSnackbar('Tipo de habitación agregado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar tipo de habitación', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await tiposHabitacionService.update(formData.id_tipo_habitacion, formData);
      showSnackbar('Tipo de habitación actualizado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar tipo de habitación', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await tiposHabitacionService.delete(row.id_tipo_habitacion);
      showSnackbar('Tipo de habitación eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar tipo de habitación', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver tipo de habitación:', row);
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
        title="Gestión de Tipos de Habitación"
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

export default TiposHabitacion; 