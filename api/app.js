require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
const usuariosRoutes = require("./routes/usuarios");
app.use("/api/usuarios", usuariosRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
