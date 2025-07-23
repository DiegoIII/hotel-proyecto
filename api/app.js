require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const { validationResult } = require("express-validator");
const morgan = require("morgan");

// Configuración básica
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(morgan("dev"));

// Middleware para manejar errores de validación
app.use((req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
});

// Rutas
const clientesRoutes = require("./routes/clientes");
app.use("/api/clientes", clientesRoutes);

// Manejo de errores centralizado
app.use((err, req, res, next) => {
  console.error("Error no manejado:", {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
  });

  res.status(500).json({
    error: "Error interno del servidor",
    detalles: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
