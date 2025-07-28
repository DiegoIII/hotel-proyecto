import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { inventarioService } from '../services/api';

const Inventario = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_item', header: 'ID', type: 'number' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'categoria', header: 'Categoría' },
    { field: 'cantidad', header: 'Cantidad', type: 'number' },
    { field: 'unidad_medida', header: 'Unidad Medida' },
    { field: 'nivel_reposicion', header: 'Nivel Reposición', type: 'number' },
    { field: 'ubicacion', header: 'Ubicación' }
  ];

  const formFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'categoria', label: 'Categoría', type: 'text', required: true },
    { name: 'cantidad', label: 'Cantidad', type: 'number', required: true },
    { name: 'unidad_medida', label: 'Unidad Medida', type: 'text' },
    { name: 'nivel_reposicion', label: 'Nivel Reposición', type: 'number' },
    { name: 'ubicacion', label: 'Ubicación', type: 'text' }
  ];

  const validationSchema = {
    nombre: { required: true, minLength: 2, maxLength: 100 },
    categoria: { required: true, minLength: 2, maxLength: 50 },
    cantidad: { required: true },
    unidad_medida: { maxLength: 20 },
    nivel_reposicion: { required: false },
    ubicacion: { maxLength: 100 }
  };

  const initialFormData = {
    nombre: '',
    categoria: '',
    cantidad: '',
    unidad_medida: '',
    nivel_reposicion: '',
    ubicacion: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await inventarioService.getAll();
      setData(response.data);
    } catch (error) {
      showSnackbar('Error al cargar inventario', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await inventarioService.create(formData);
      showSnackbar('Item agregado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar item', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await inventarioService.update(formData.id_item, formData);
      showSnackbar('Item actualizado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar item', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await inventarioService.delete(row.id_item);
      showSnackbar('Item eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar item', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver item:', row);
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
        title="Gestión de Inventario"
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

export default Inventario; 