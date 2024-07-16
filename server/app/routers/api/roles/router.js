const express = require("express");

const router = express.Router();

// Import role-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/roleActions");

// Route to get a list of roles
router.get("/", browse);

// Route to get a specific role by ID
router.get("/:id", read);

// Route to add a new role
router.post("/", add);

// Route to update a role by ID
router.put("/:id", edit);

// Route to delete a role by ID
router.delete("/:id", destroy);

module.exports = router;
