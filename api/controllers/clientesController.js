const db = require("../db");

exports.getClientes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT 
        c.id_cliente,
        u.nombre,
        u.email,
        u.telefono,
        c.documento_identidad,
        c.fecha_nacimiento,
        c.nacionalidad
      FROM clientes c
      JOIN usuarios u ON c.id_usuario = u.id_usuario
    `);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener clientes:", error);
    res.status(500).json({
      error: "Error al obtener clientes",
      detalles:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
};

exports.createCliente = async (req, res) => {
  const {
    nombre,
    email,
    telefono,
    contrasena,
    documento_identidad,
    fecha_nacimiento,
    nacionalidad,
    preferencias,
  } = req.body;

  // Validaciones básicas
  if (!nombre || !email || !contrasena || !documento_identidad) {
    return res.status(400).json({
      error:
        "Faltan campos requeridos: nombre, email, contraseña y documento de identidad son obligatorios",
    });
  }

  try {
    // Iniciar transacción
    await db.query("START TRANSACTION");

    // 1. Crear usuario primero
    const [usuarioResult] = await db.query(
      `INSERT INTO usuarios 
        (nombre, email, telefono, contrasena, tipo) 
       VALUES (?, ?, ?, ?, 'cliente')`,
      [nombre, email, telefono, contrasena]
    );

    // 2. Crear cliente
    const [clienteResult] = await db.query(
      `INSERT INTO clientes 
        (id_usuario, documento_identidad, fecha_nacimiento, nacionalidad, preferencias) 
       VALUES (?, ?, ?, ?, ?)`,
      [
        usuarioResult.insertId,
        documento_identidad,
        fecha_nacimiento || null,
        nacionalidad || null,
        preferencias || null,
      ]
    );

    // Confirmar transacción
    await db.query("COMMIT");

    // Obtener el cliente recién creado
    const [cliente] = await db.query(
      `
      SELECT 
        c.id_cliente,
        u.nombre,
        u.email,
        u.telefono,
        c.documento_identidad,
        c.fecha_nacimiento,
        c.nacionalidad
      FROM clientes c
      JOIN usuarios u ON c.id_usuario = u.id_usuario
      WHERE c.id_cliente = ?
    `,
      [clienteResult.insertId]
    );

    res.status(201).json({
      success: true,
      cliente: cliente[0],
      message: "Cliente registrado exitosamente",
    });
  } catch (error) {
    // Revertir transacción en caso de error
    await db.query("ROLLBACK");

    console.error("Error al crear cliente:", {
      message: error.message,
      code: error.code,
      sql: error.sql,
    });

    // Manejo de errores específicos
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(409).json({
        error: "El email ya está registrado",
        field: "email",
      });
    }

    res.status(500).json({
      error: "Error al registrar cliente",
      detalles:
        process.env.NODE_ENV === "development"
          ? {
              message: error.message,
              code: error.code,
            }
          : undefined,
    });
  }
};
