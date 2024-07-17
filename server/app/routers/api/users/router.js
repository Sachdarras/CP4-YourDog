const express = require("express");

const router = express.Router();

const { hashPassword } = require("../../../services/auth"); // Import du middleware hashPassword
const {
  browse,
  read,
  edit,
  add,
  destroy,
} = require("../../../controllers/userActions");

// Route pour obtenir une liste d'utilisateurs
router.get("/", browse);

// Route pour obtenir un utilisateur spécifique par ID
router.get("/:id", read);

// Route pour mettre à jour un utilisateur par ID
router.put("/:id", edit);

// Route pour ajouter un nouvel utilisateur
router.post("/", add);

// Route pour enregistrer un nouvel utilisateur avec hashage du mot de passe
router.post("/register", hashPassword, add); // Utilisation de hashPassword avant la fonction add

// Route pour supprimer un utilisateur par ID
router.delete("/:id", destroy);

module.exports = router;
