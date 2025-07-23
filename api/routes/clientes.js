const express = require("express");
const router = express.Router();
const {
  getClientes,
  createCliente,
} = require("../controllers/clientesController");
const { body } = require("express-validator");

// Validaciones para crear cliente
const clienteValidations = [
  body("nombre").trim().notEmpty().withMessage("El nombre es requerido"),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("Formato de email inválido"),
  body("contrasena")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .isLength({ min: 6 })
    .withMessage("La contraseña debe tener al menos 6 caracteres"),
  body("documento_identidad")
    .notEmpty()
    .withMessage("El documento de identidad es requerido"),
  body("telefono").optional().trim(),
  body("fecha_nacimiento").optional().isDate(),
  body("nacionalidad").optional().trim(),
  body("preferencias").optional().trim(),
];

router.get("/", getClientes);
router.post("/", clienteValidations, createCliente);

module.exports = router;
