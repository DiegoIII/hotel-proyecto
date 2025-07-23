const db = require("../db");

exports.getUsuarios = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM usuarios");
    res.json(rows);
  } catch (err) {
    console.error("Error al obtener usuarios:", err);
    res.status(500).json({ error: "Error al obtener usuarios" });
  }
};

exports.createUsuario = async (req, res) => {
  const { nombre, email, contrasena, telefono, tipo } = req.body;

  if (!nombre || !email || !contrasena || !tipo) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO usuarios (nombre, email, contrasena, telefono, tipo) VALUES (?, ?, ?, ?, ?)",
      [nombre, email, contrasena, telefono, tipo]
    );

    res.status(201).json({
      id_usuario: result.insertId,
      nombre,
      email,
      telefono,
      tipo,
    });
  } catch (err) {
    console.error("Error al crear usuario:", err);
    res.status(500).json({ error: "Error al crear usuario" });
  }
};
