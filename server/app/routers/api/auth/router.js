const express = require("express");

const router = express.Router();

const { login } = require("../../../controllers/authActions");

// Route POST pour gérer la connexion (login)
router.post("/login", login);

module.exports = router;
