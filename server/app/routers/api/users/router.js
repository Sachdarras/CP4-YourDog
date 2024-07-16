const express = require("express");

const router = express.Router();

// Import user-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/userActions");

// Route to get a list of users
router.get("/", browse);

// Route to get a specific user by ID
router.get("/:id", read);

// Route to add a new user
router.post("/", add);

// Route to update a user by ID
router.put("/:id", edit);

// Route to delete a user by ID
router.delete("/:id", destroy);

module.exports = router;
