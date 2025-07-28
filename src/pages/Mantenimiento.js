import React, { useState, useEffect } from 'react';
import { Alert, Snackbar } from '@mui/material';
import DataTable from '../components/DataTable';
import { mantenimientoService, habitacionesService, empleadosService } from '../services/api';

const Mantenimiento = () => {
  const [data, setData] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [empleados, setEmpleados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const columns = [
    { field: 'id_mantenimiento', header: 'ID', type: 'number' },
    { field: 'id_habitacion', header: 'ID Habitación', type: 'number' },
    { field: 'id_empleado', header: 'ID Empleado', type: 'number' },
    { 
      field: 'tipo', 
      header: 'Tipo',
      type: 'enum',
      options: [
        { value: 'limpieza', label: 'Limpieza', color: 'primary' },
        { value: 'reparacion', label: 'Reparación', color: 'warning' },
        { value: 'inspeccion', label: 'Inspección', color: 'info' },
        { value: 'otros', label: 'Otros', color: 'default' }
      ]
    },
    { field: 'fecha_solicitud', header: 'Fecha Solicitud', type: 'date' },
    { field: 'fecha_completado', header: 'Fecha Completado', type: 'date' },
    { field: 'descripcion', header: 'Descripción' },
    { 
      field: 'estado', 
      header: 'Estado',
      type: 'enum',
      options: [
        { value: 'pendiente', label: 'Pendiente', color: 'warning' },
        { value: 'en-proceso', label: 'En Proceso', color: 'info' },
        { value: 'completado', label: 'Completado', color: 'success' }
      ]
    }
  ];

  const formFields = [
    {
      name: 'id_habitacion',
      label: 'Habitación',
      type: 'select',
      options: [],
      required: true
    },
    {
      name: 'id_empleado',
      label: 'Empleado',
      type: 'select',
      options: [],
      required: false
    },
    {
      name: 'tipo',
      label: 'Tipo',
      type: 'select',
      options: [
        { value: 'limpieza', label: 'Limpieza' },
        { value: 'reparacion', label: 'Reparación' },
        { value: 'inspeccion', label: 'Inspección' },
        { value: 'otros', label: 'Otros' }
      ],
      required: true
    },
    { name: 'fecha_completado', label: 'Fecha Completado', type: 'date' },
    { 
      name: 'descripcion', 
      label: 'Descripción', 
      type: 'textarea',
      rows: 3,
      required: true
    },
    {
      name: 'estado',
      label: 'Estado',
      type: 'select',
      options: [
        { value: 'pendiente', label: 'Pendiente' },
        { value: 'en-proceso', label: 'En Proceso' },
        { value: 'completado', label: 'Completado' }
      ],
      required: true
    }
  ];

  const validationSchema = {
    id_habitacion: { required: true },
    id_empleado: { required: false },
    tipo: { required: true },
    fecha_completado: { required: false },
    descripcion: { required: true, minLength: 10, maxLength: 1000 },
    estado: { required: true }
  };

  const initialFormData = {
    id_habitacion: '',
    id_empleado: '',
    tipo: '',
    fecha_completado: '',
    descripcion: '',
    estado: ''
  };

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [mantenimientoResponse, habitacionesResponse, empleadosResponse] = await Promise.all([
        mantenimientoService.getAll(),
        habitacionesService.getAll(),
        empleadosService.getAll()
      ]);
      
      setData(mantenimientoResponse.data);
      
      const habitacionesOptions = habitacionesResponse.data.map(habitacion => ({
        value: habitacion.id_habitacion,
        label: `Habitación ${habitacion.numero_habitacion}`
      }));
      
      const empleadosOptions = empleadosResponse.data.map(empleado => ({
        value: empleado.id_empleado,
        label: `Empleado ${empleado.id_empleado} - ${empleado.puesto}`
      }));
      
      setHabitaciones(habitacionesOptions);
      setEmpleados(empleadosOptions);
      
      // Actualizar las opciones del formulario
      formFields.find(field => field.name === 'id_habitacion').options = habitacionesOptions;
      formFields.find(field => field.name === 'id_empleado').options = empleadosOptions;
      
    } catch (error) {
      showSnackbar('Error al cargar mantenimiento', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (formData) => {
    try {
      await mantenimientoService.create(formData);
      showSnackbar('Mantenimiento agregado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al agregar mantenimiento', 'error');
    }
  };

  const handleEdit = async (formData) => {
    try {
      await mantenimientoService.update(formData.id_mantenimiento, formData);
      showSnackbar('Mantenimiento actualizado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al actualizar mantenimiento', 'error');
    }
  };

  const handleDelete = async (row) => {
    try {
      await mantenimientoService.delete(row.id_mantenimiento);
      showSnackbar('Mantenimiento eliminado exitosamente', 'success');
      loadData();
    } catch (error) {
      showSnackbar('Error al eliminar mantenimiento', 'error');
    }
  };

  const handleView = (row) => {
    console.log('Ver mantenimiento:', row);
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
        title="Gestión de Mantenimiento"
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

export default Mantenimiento; 