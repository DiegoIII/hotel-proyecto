# Sistema de Gestión Hotelera

Un sistema completo de gestión hotelera desarrollado con React para el frontend y MySQL para la base de datos.

## Características

### 🏨 Gestión Completa de Hotel
- **Usuarios**: Gestión de usuarios con diferentes roles (cliente, empleado, administrador)
- **Empleados**: Control de personal con puestos, salarios y turnos
- **Clientes**: Información detallada de clientes con preferencias
- **Habitaciones**: Gestión de habitaciones con estados y tipos
- **Tipos de Habitación**: Configuración de diferentes categorías de habitaciones
- **Reservas**: Sistema completo de reservas con fechas y estados
- **Servicios**: Gestión de servicios adicionales (restaurante, spa, etc.)
- **Reserva Servicios**: Vinculación de servicios con reservas
- **Pagos**: Control de pagos con diferentes métodos
- **Inventario**: Gestión de inventario del hotel
- **Mantenimiento**: Control de mantenimiento de habitaciones
- **Comentarios**: Sistema de comentarios y calificaciones

### 🎨 Interfaz Moderna
- Diseño responsive con Material-UI
- Navegación intuitiva con sidebar
- Formularios validados
- Notificaciones en tiempo real
- Tablas interactivas con CRUD completo

### 🔧 Tecnologías Utilizadas
- **Frontend**: React 19, Material-UI, React Router
- **Backend**: Node.js, Express
- **Base de Datos**: MySQL
- **Herramientas**: Axios para API calls

## Instalación

### Prerrequisitos
- Node.js (versión 16 o superior)
- MySQL (versión 8.0 o superior)
- npm o yarn

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone <url-del-repositorio>
cd hotel-proyecto
```

2. **Instalar dependencias del frontend**
```bash
npm install
```

3. **Configurar la base de datos**
```bash
# Ejecutar el script SQL en tu servidor MySQL
mysql -u root -p < backend/init.sql
```

4. **Configurar variables de entorno**
Crear un archivo `.env` en la raíz del proyecto:
```env
REACT_APP_API_URL=http://localhost:3001/api
```

5. **Iniciar el servidor de desarrollo**
```bash
npm start
```

El sistema estará disponible en `http://localhost:3000`

## Estructura del Proyecto

```
hotel-proyecto/
├── src/
│   ├── components/
│   │   └── DataTable.js          # Componente reutilizable para tablas
│   ├── pages/
│   │   ├── Usuarios.js           # Gestión de usuarios
│   │   ├── Empleados.js          # Gestión de empleados
│   │   ├── Clientes.js           # Gestión de clientes
│   │   ├── Habitaciones.js       # Gestión de habitaciones
│   │   ├── TiposHabitacion.js    # Gestión de tipos de habitación
│   │   ├── Reservas.js           # Gestión de reservas
│   │   ├── Servicios.js          # Gestión de servicios
│   │   ├── ReservaServicios.js   # Gestión de reserva de servicios
│   │   ├── Pagos.js              # Gestión de pagos
│   │   ├── Inventario.js         # Gestión de inventario
│   │   ├── Mantenimiento.js      # Gestión de mantenimiento
│   │   └── Comentarios.js        # Gestión de comentarios
│   ├── services/
│   │   └── api.js                # Servicios para llamadas a la API
│   └── App.js                    # Componente principal
├── backend/
│   └── init.sql                  # Script de inicialización de la base de datos
└── package.json
```

## Funcionalidades por Módulo

### 👥 Usuarios
- Crear, editar, eliminar usuarios
- Diferentes tipos: cliente, empleado, administrador
- Validación de email único
- Gestión de contraseñas

### 👨‍💼 Empleados
- Vinculación con usuarios
- Gestión de puestos y salarios
- Control de turnos (mañana, tarde, noche)
- Fechas de contratación

### 👤 Clientes
- Información personal detallada
- Documento de identidad único
- Preferencias y nacionalidad
- Fecha de nacimiento

### 🏠 Habitaciones
- Números únicos de habitación
- Estados: disponible, ocupada, mantenimiento, reservada
- Vinculación con tipos de habitación
- Control de pisos y limpieza

### 🛏️ Tipos de Habitación
- Configuración de capacidades
- Precios por noche
- Amenities disponibles
- Imágenes de referencia

### 📅 Reservas
- Fechas de entrada y salida
- Estados: pendiente, confirmada, cancelada, completada
- Control de adultos y niños
- Cálculo automático de totales

### 🍽️ Servicios
- Categorías: restaurante, spa, lavandería, transporte, otros
- Disponibilidad: 24h, diurno, nocturno, horario limitado
- Precios configurables

### 💳 Pagos
- Múltiples métodos de pago
- Estados de transacción
- IDs de transacción para seguimiento
- Fechas automáticas

### 📦 Inventario
- Control de stock
- Niveles de reposición
- Ubicaciones específicas
- Unidades de medida

### 🔧 Mantenimiento
- Tipos: limpieza, reparación, inspección, otros
- Estados: pendiente, en proceso, completado
- Asignación de empleados
- Fechas de solicitud y completado

### 💬 Comentarios
- Sistema de calificaciones
- Comentarios de clientes
- Respuestas del hotel
- Fechas automáticas

## API Endpoints

El sistema incluye endpoints RESTful para todas las entidades:

- `GET /api/usuarios` - Obtener todos los usuarios
- `POST /api/usuarios` - Crear usuario
- `PUT /api/usuarios/:id` - Actualizar usuario
- `DELETE /api/usuarios/:id` - Eliminar usuario

(Repetir para todas las entidades: empleados, clientes, habitaciones, etc.)

## Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## Contacto

Para preguntas o soporte, contacta al equipo de desarrollo.

---

**Desarrollado con ❤️ para la gestión hotelera moderna**
