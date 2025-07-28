import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { empleadosService, usuariosService } from '../services/api';

const Empleados = () => {
  const [data, setData] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_empleado', header: 'ID', type: 'number' },
    { field: 'id_usuario', header: 'ID Usuario', type: 'number' },
    { field: 'puesto', header: 'Puesto' },
    { 
      field: 'fecha_contratacion', 
      header: 'Fecha Contratación',
      type: 'date'
    },
    { 
      field: 'salario', 
      header: 'Salario',
      type: 'currency'
    },
    { 
      field: 'turno', 
      header: 'Turno',
      type: 'enum',
      options: [
        { value: 'mañana', label: 'Mañana', color: 'primary' },
        { value: 'tarde', label: 'Tarde', color: 'secondary' },
        { value: 'noche', label: 'Noche', color: 'error' }
      ]
    }
  ];

  const formFields = [
    {
      name: 'id_usuario',
      label: 'Usuario',
      type: 'select',
      options: [],
      required: true
    },
    { name: 'puesto', label: 'Puesto', type: 'text', required: true },
    { name: 'fecha_contratacion', label: 'Fecha Contratación', type: 'date', required: true },
    { name: 'salario', label: 'Salario', type: 'number' },
    {
      name: 'turno',
      label: 'Turno',
      type: 'select',
      options: [
        { value: 'mañana', label: 'Mañana' },
        { value: 'tarde', label: 'Tarde' },
        { value: 'noche', label: 'Noche' }
      ]
    }
  ];

  const validationSchema = {
    id_usuario: { required: true },
    puesto: { required: true, minLength: 2, maxLength: 50 },
    fecha_contratacion: { required: true },
    salario: { minLength: 1 },
    turno: { required: false }
  };

  const initialFormData = {
    id_usuario: '',
    puesto: '',
    fecha_contratacion: '',
    salario: '',
    turno: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [empleadosResponse, usuariosResponse] = await Promise.all([
        empleadosService.getAll(),
        usuariosService.getAll()
      ]);
      
      setData(empleadosResponse.data);
      
      // Filtrar solo usuarios de tipo empleado
      const empleadosUsuarios = usuariosResponse.data.filter(
        usuario => usuario.tipo === 'empleado'
      );
      
      const usuariosOptions = empleadosUsuarios.map(usuario => ({
        value: usuario.id_usuario,
        label: `${usuario.nombre} (${usuario.email})`
      }));
      
      setUsuarios(usuariosOptions);
      
      // Actualizar las opciones del formulario
      formFields.find(field => field.name === 'id_usuario').options = usuariosOptions;
      
    } catch (error) {
      showSnackbar('Error al cargar empleados', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await empleadosService.create(formData);
      showSnackbar('Empleado agregado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar empleado', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await empleadosService.update(formData.id_empleado, formData);
      showSnackbar('Empleado actualizado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar empleado', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await empleadosService.delete(row.id_empleado);
      showSnackbar('Empleado eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar empleado', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver empleado:', row);
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
        title="Gestión de Empleados"
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

export default Empleados; 