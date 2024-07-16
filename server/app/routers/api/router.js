const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Import And Use Routers Here
/* ************************************************************************* */

const usersRouter = require("./users/router");
const rolesRouter = require("./roles/router");
const activitySportRouter = require("./activity_sport/router");
const promenadeRouter = require("./promenade/router");
const dogfriendlyRouter = require("./dogfriendly/router");

router.use("/users", usersRouter);
router.use("/roles", rolesRouter);
router.use("/activity_sport", activitySportRouter);
router.use("/promenade", promenadeRouter);
router.use("/dogfriendly", dogfriendlyRouter);

/* ************************************************************************* */

module.exports = router;
