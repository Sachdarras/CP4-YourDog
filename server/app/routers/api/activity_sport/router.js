const express = require("express");

const router = express.Router();

// Import activity_sport-related actions
const {
  browse,
  read,
  add,
  edit,
  destroy,
} = require("../../../controllers/activity_sport");

// Route to get a list of activities
router.get("/", browse);

// Route to get a specific activity by ID
router.get("/:id", read);

// Route to add a new activity
router.post("/", add);

// Route to update an activity by ID
router.put("/:id", edit);

// Route to delete an activity by ID
router.delete("/:id", destroy);

module.exports = router;
