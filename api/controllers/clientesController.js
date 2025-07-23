const db = require("../db");

exports.getClientes = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM clientes");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener clientes" });
  }
};
