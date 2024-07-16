const express = require("express");

const router = express.Router();

// Import promenade-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/promenadeActions");

// Route to get a list of promenades
router.get("/", browse);

// Route to get a specific promenade by ID
router.get("/:id", read);

// Route to add a new promenade
router.post("/", add);

// Route to update a promenade by ID
router.put("/:id", edit);

// Route to delete a promenade by ID
router.delete("/:id", destroy);

module.exports = router;
