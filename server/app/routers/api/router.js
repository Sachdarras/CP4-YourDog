const express = require("express");

const apiRouter = express.Router();

// Importation des routeurs
const usersRouter = require("./users/router");

const rolesRouter = require("./roles/router");

const activitySportRouter = require("./activity_sport/router");

const promenadeRouter = require("./promenade/router");

const dogfriendlyRouter = require("./dogfriendly/router");

const authRouter = require("./auth/router");

// Utilisation des routeurs
apiRouter.use("/users", usersRouter);

apiRouter.use("/roles", rolesRouter);

apiRouter.use("/activity_sport", activitySportRouter);

apiRouter.use("/promenade", promenadeRouter);

apiRouter.use("/dogfriendly", dogfriendlyRouter);

apiRouter.use("/auth", authRouter);

module.exports = apiRouter;
