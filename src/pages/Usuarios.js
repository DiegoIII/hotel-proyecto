import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { usuariosService } from '../services/api';

const Usuarios = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_usuario', header: 'ID', type: 'number' },
    { field: 'nombre', header: 'Nombre' },
    { field: 'email', header: 'Email' },
    { field: 'telefono', header: 'Teléfono' },
    { 
      field: 'tipo', 
      header: 'Tipo',
      type: 'enum',
      options: [
        { value: 'cliente', label: 'Cliente', color: 'primary' },
        { value: 'empleado', label: 'Empleado', color: 'secondary' },
        { value: 'administrador', label: 'Administrador', color: 'error' }
      ]
    },
    { 
      field: 'fecha_registro', 
      header: 'Fecha Registro',
      type: 'date'
    }
  ];

  const formFields = [
    { name: 'nombre', label: 'Nombre', type: 'text', required: true },
    { name: 'email', label: 'Email', type: 'email', required: true },
    { name: 'contrasena', label: 'Contraseña', type: 'password', required: true },
    { name: 'telefono', label: 'Teléfono', type: 'text' },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      options: [
        { value: 'cliente', label: 'Cliente' },
        { value: 'empleado', label: 'Empleado' },
        { value: 'administrador', label: 'Administrador' }
      ],
      required: true
    }
  ];

  const validationSchema = {
    nombre: { required: true, minLength: 2, maxLength: 100 },
    email: { 
      required: true, 
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Email inválido'
    },
    contrasena: { required: true, minLength: 6 },
    telefono: { maxLength: 20 },
    tipo: { required: true }
  };

  const initialFormData = {
    nombre: '',
    email: '',
    contrasena: '',
    telefono: '',
    tipo: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const response = await usuariosService.getAll();
      setData(response.data);
    } catch (error) {
      showSnackbar('Error al cargar usuarios', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await usuariosService.create(formData);
      showSnackbar('Usuario agregado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar usuario', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await usuariosService.update(formData.id_usuario, formData);
      showSnackbar('Usuario actualizado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar usuario', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await usuariosService.delete(row.id_usuario);
      showSnackbar('Usuario eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar usuario', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver usuario:', row);
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
        title="Gestión de Usuarios"
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

export default Usuarios; 