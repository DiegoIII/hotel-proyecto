CREATE DATABASE IF NOT EXISTS hotel_db;
USE hotel_db;

-- Tabla de usuarios
CREATE TABLE usuarios (
  id_usuario INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  contrasena VARCHAR(255) NOT NULL,
  telefono VARCHAR(20),
  tipo ENUM('cliente', 'empleado', 'administrador') NOT NULL,
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de empleados
CREATE TABLE empleados (
  id_empleado INT PRIMARY KEY,
  id_usuario INT NOT NULL,
  puesto VARCHAR(50) NOT NULL,
  fecha_contratacion DATE NOT NULL,
  salario DECIMAL(10,2),
  turno ENUM('mañana', 'tarde', 'noche'),
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabla de clientes
CREATE TABLE clientes (
  id_cliente INT PRIMARY KEY,
  id_usuario INT NOT NULL,
  documento_identidad VARCHAR(50) NOT NULL UNIQUE,
  fecha_nacimiento DATE,
  nacionalidad VARCHAR(50),
  preferencias TEXT,
  FOREIGN KEY (id_usuario) REFERENCES usuarios(id_usuario)
);

-- Tabla tipos_habitacion
CREATE TABLE tipos_habitacion (
  id_tipo_habitacion INT PRIMARY KEY,
  nombre VARCHAR(50) NOT NULL,
  descripcion TEXT,
  capacidad INT NOT NULL,
  precio_noche DECIMAL(10,2) NOT NULL,
  amenities TEXT,
  imagen_url VARCHAR(255)
);

-- Tabla de habitaciones
CREATE TABLE habitaciones (
  id_habitacion INT PRIMARY KEY,
  numero_habitacion VARCHAR(10) NOT NULL UNIQUE,
  id_tipo_habitacion INT NOT NULL,
  piso INT NOT NULL,
  estado ENUM('disponible', 'ocupada', 'mantenimiento', 'reservada') NOT NULL,
  ultima_limpieza TIMESTAMP,
  notas TEXT,
  FOREIGN KEY (id_tipo_habitacion) REFERENCES tipos_habitacion(id_tipo_habitacion)
);

-- Tabla de reservas
CREATE TABLE reservas (
  id_reserva INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  id_habitacion INT NOT NULL,
  fecha_entrada DATE NOT NULL,
  fecha_salida DATE NOT NULL,
  estado ENUM('pendiente', 'confirmada', 'cancelada', 'completada') NOT NULL,
  fecha_reserva TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(12,2),
  notas TEXT,
  adultos INT NOT NULL,
  ninos INT DEFAULT 0,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
  FOREIGN KEY (id_habitacion) REFERENCES habitaciones(id_habitacion)
);

-- Tabla de servicios
CREATE TABLE servicios (
  id_servicio INT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  categoria ENUM('restaurante', 'spa', 'lavanderia', 'transporte', 'otros'),
  disponibilidad ENUM('24h', 'diurno', 'nocturno', 'horario-limitado')
);

-- Tabla reserva_servicios
CREATE TABLE reserva_servicios (
  id_reserva_servicio INT AUTO_INCREMENT PRIMARY KEY,
  id_reserva INT NOT NULL,
  id_servicio INT NOT NULL,
  fecha_servicio TIMESTAMP NOT NULL,
  cantidad INT DEFAULT 1,
  notas TEXT,
  estado ENUM('pendiente', 'completado', 'cancelado'),
  FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva),
  FOREIGN KEY (id_servicio) REFERENCES servicios(id_servicio)
);

-- Tabla pagos
CREATE TABLE pagos (
  id_pago INT AUTO_INCREMENT PRIMARY KEY,
  id_reserva INT NOT NULL,
  monto DECIMAL(12,2) NOT NULL,
  metodo_pago ENUM('efectivo', 'tarjeta', 'transferencia', 'otros') NOT NULL,
  fecha_pago TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado ENUM('pendiente', 'completado', 'reembolsado', 'fallido') NOT NULL,
  transaccion_id VARCHAR(100),
  FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva)
);

-- Tabla inventario
CREATE TABLE inventario (
  id_item INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  categoria VARCHAR(50) NOT NULL,
  cantidad INT NOT NULL,
  unidad_medida VARCHAR(20),
  nivel_reposicion INT,
  ubicacion VARCHAR(100)
);

-- Tabla mantenimiento
CREATE TABLE mantenimiento (
  id_mantenimiento INT AUTO_INCREMENT PRIMARY KEY,
  id_habitacion INT NOT NULL,
  id_empleado INT,
  tipo ENUM('limpieza', 'reparacion', 'inspeccion', 'otros') NOT NULL,
  fecha_solicitud TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  fecha_completado TIMESTAMP,
  descripcion TEXT NOT NULL,
  estado ENUM('pendiente', 'en-proceso', 'completado') NOT NULL,
  FOREIGN KEY (id_habitacion) REFERENCES habitaciones(id_habitacion),
  FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado)
);

-- Tabla comentarios
CREATE TABLE comentarios (
  id_comentario INT AUTO_INCREMENT PRIMARY KEY,
  id_cliente INT NOT NULL,
  id_reserva INT,
  calificacion INT NOT NULL,
  comentario TEXT,
  fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  respuesta TEXT,
  fecha_respuesta TIMESTAMP,
  FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente),
  FOREIGN KEY (id_reserva) REFERENCES reservas(id_reserva)
);
