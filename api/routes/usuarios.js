const express = require("express");
const router = express.Router();
const {
  getUsuarios,
  createUsuario,
} = require("../controllers/usuariosController");

router.get("/", getUsuarios);

router.post("/", createUsuario);

module.exports = router;
