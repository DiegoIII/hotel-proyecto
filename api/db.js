const mysql = require("mysql2/promise"); // Cambiado a la versión promise

const pool = mysql.createPool({
  host: "localhost",
  user: "hotel_user",
  password: "hotel_pass",
  database: "hotel_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true, // Habilitar placeholders con nombre
});

// Verificar conexión al iniciar
(async () => {
  try {
    const conn = await pool.getConnection();
    console.log("Conexión a la base de datos establecida");
    conn.release();
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
    process.exit(1);
  }
})();

module.exports = pool;
