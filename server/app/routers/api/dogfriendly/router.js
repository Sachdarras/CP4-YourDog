const express = require("express");

const router = express.Router();

// Import dogfriendly-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/dogfriendlyActions");

// Route to get a list of dogfriendly places
router.get("/", browse);

// Route to get a specific dogfriendly place by ID
router.get("/:id", read);

// Route to add a new dogfriendly place
router.post("/", add);

// Route to update a dogfriendly place by ID
router.put("/:id", edit);

// Route to delete a dogfriendly place by ID
router.delete("/:id", destroy);

module.exports = router;
