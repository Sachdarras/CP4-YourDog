const express = require("express");

const router = express.Router();

const { login, register } = require("../../../services/auth");
const { hashPassword } = require("../../../services/auth");

router.post("/login", login);
router.post("/register", hashPassword, register);

module.exports = router;
