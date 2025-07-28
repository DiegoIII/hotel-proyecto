import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Typography,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';

const DataTable = ({
  title,
  columns,
  data,
  onAdd,
  onEdit,
  onDelete,
  onView,
  formFields,
  initialFormData,
  validationSchema
}) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('add');
  const [formData, setFormData] = useState(initialFormData || {});
  const [errors, setErrors] = useState({});

  const handleOpenDialog = (mode = 'add', rowData = null) => {
    setDialogMode(mode);
    if (mode === 'edit' && rowData) {
      setFormData(rowData);
    } else {
      setFormData(initialFormData || {});
    }
    setErrors({});
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData(initialFormData || {});
    setErrors({});
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (validationSchema) {
      Object.keys(validationSchema).forEach(field => {
        const rules = validationSchema[field];
        const value = formData[field];
        
        if (rules.required && (!value || value === '')) {
          newErrors[field] = `${field} es requerido`;
        } else if (rules.minLength && value && value.length < rules.minLength) {
          newErrors[field] = `Mínimo ${rules.minLength} caracteres`;
        } else if (rules.maxLength && value && value.length > rules.maxLength) {
          newErrors[field] = `Máximo ${rules.maxLength} caracteres`;
        } else if (rules.pattern && value && !rules.pattern.test(value)) {
          newErrors[field] = rules.message || 'Formato inválido';
        }
      });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    
    if (dialogMode === 'add' && onAdd) {
      onAdd(formData);
    } else if (dialogMode === 'edit' && onEdit) {
      onEdit(formData);
    }
    
    handleCloseDialog();
  };

  const renderField = (field, fieldConfig) => {
    const { type = 'text', label, options, multiline, rows } = fieldConfig;
    
    switch (type) {
      case 'select':
        return (
          <FormControl fullWidth margin="normal">
            <InputLabel>{label}</InputLabel>
            <Select
              value={formData[field] || ''}
              onChange={(e) => handleInputChange(field, e.target.value)}
              label={label}
              error={!!errors[field]}
            >
              {options.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      
      case 'textarea':
        return (
          <TextField
            fullWidth
            margin="normal"
            label={label}
            value={formData[field] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            multiline
            rows={rows || 3}
            error={!!errors[field]}
            helperText={errors[field]}
          />
        );
      
      case 'date':
        return (
          <TextField
            fullWidth
            margin="normal"
            label={label}
            type="date"
            value={formData[field] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            InputLabelProps={{ shrink: true }}
            error={!!errors[field]}
            helperText={errors[field]}
          />
        );
      
      default:
        return (
          <TextField
            fullWidth
            margin="normal"
            label={label}
            type={type}
            value={formData[field] || ''}
            onChange={(e) => handleInputChange(field, e.target.value)}
            error={!!errors[field]}
            helperText={errors[field]}
          />
        );
    }
  };

  const renderCellValue = (value, column) => {
    if (column.type === 'enum' && column.options) {
      const option = column.options.find(opt => opt.value === value);
      return option ? (
        <Chip 
          label={option.label} 
          color={option.color || 'default'} 
          size="small" 
        />
      ) : value;
    }
    
    if (column.type === 'date') {
      return value ? new Date(value).toLocaleDateString() : '';
    }
    
    if (column.type === 'currency') {
      return value ? `$${parseFloat(value).toFixed(2)}` : '$0.00';
    }
    
    return value;
  };

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h5" component="h2">
          {title}
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('add')}
        >
          Agregar
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.field}>{column.header}</TableCell>
              ))}
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.id || index}>
                {columns.map((column) => (
                  <TableCell key={column.field}>
                    {renderCellValue(row[column.field], column)}
                  </TableCell>
                ))}
                <TableCell align="center">
                  <IconButton
                    size="small"
                    onClick={() => onView && onView(row)}
                    title="Ver"
                  >
                    <ViewIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => handleOpenDialog('edit', row)}
                    title="Editar"
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    size="small"
                    onClick={() => onDelete && onDelete(row)}
                    title="Eliminar"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogMode === 'add' ? `Agregar ${title}` : `Editar ${title}`}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            {formFields.map((field) => (
              <Grid item xs={12} sm={6} key={field.name}>
                {renderField(field.name, field)}
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit} variant="contained">
            {dialogMode === 'add' ? 'Agregar' : 'Guardar'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DataTable; 