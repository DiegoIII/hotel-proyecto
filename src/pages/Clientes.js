import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { clientesService, usuariosService } from '../services/api';

const Clientes = () => {
  const [data, setData] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_cliente', header: 'ID', type: 'number' },
    { field: 'id_usuario', header: 'ID Usuario', type: 'number' },
    { field: 'documento_identidad', header: 'Documento Identidad' },
    { 
      field: 'fecha_nacimiento', 
      header: 'Fecha Nacimiento',
      type: 'date'
    },
    { field: 'nacionalidad', header: 'Nacionalidad' },
    { field: 'preferencias', header: 'Preferencias' }
  ];

  const formFields = [
    {
      name: 'id_usuario',
      label: 'Usuario',
      type: 'select',
      options: [],
      required: true
    },
    { name: 'documento_identidad', label: 'Documento Identidad', type: 'text', required: true },
    { name: 'fecha_nacimiento', label: 'Fecha Nacimiento', type: 'date' },
    { name: 'nacionalidad', label: 'Nacionalidad', type: 'text' },
    { 
      name: 'preferencias', 
      label: 'Preferencias', 
      type: 'textarea',
      rows: 3
    }
  ];

  const validationSchema = {
    id_usuario: { required: true },
    documento_identidad: { required: true, minLength: 5, maxLength: 50 },
    fecha_nacimiento: { required: false },
    nacionalidad: { maxLength: 50 },
    preferencias: { maxLength: 1000 }
  };

  const initialFormData = {
    id_usuario: '',
    documento_identidad: '',
    fecha_nacimiento: '',
    nacionalidad: '',
    preferencias: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [clientesResponse, usuariosResponse] = await Promise.all([
        clientesService.getAll(),
        usuariosService.getAll()
      ]);
      
      setData(clientesResponse.data);
      
      // Filtrar solo usuarios de tipo cliente
      const clientesUsuarios = usuariosResponse.data.filter(
        usuario => usuario.tipo === 'cliente'
      );
      
      const usuariosOptions = clientesUsuarios.map(usuario => ({
        value: usuario.id_usuario,
        label: `${usuario.nombre} (${usuario.email})`
      }));
      
      setUsuarios(usuariosOptions);
      
      // Actualizar las opciones del formulario
      formFields.find(field => field.name === 'id_usuario').options = usuariosOptions;
      
    } catch (error) {
      showSnackbar('Error al cargar clientes', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await clientesService.create(formData);
      showSnackbar('Cliente agregado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar cliente', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await clientesService.update(formData.id_cliente, formData);
      showSnackbar('Cliente actualizado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar cliente', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await clientesService.delete(row.id_cliente);
      showSnackbar('Cliente eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar cliente', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver cliente:', row);
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
        title="Gestión de Clientes"
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

export default Clientes; 