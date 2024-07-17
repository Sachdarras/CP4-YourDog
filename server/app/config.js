// Chargez le module express pour créer une application web
const express = require("express");

const app = express();

// Gestion CORS
const cors = require("cors");

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL, // Garder cette ligne après avoir vérifié la valeur dans `server/.env`
    ],
  })
);

// Analyse des requêtes
app.use(express.json());
// app.use(express.urlencoded());
// app.use(express.text());
// app.use(express.raw());

// Cookies
// Pour utiliser `cookie-parser`, assurez-vous qu'il est installé dans `server/package.json`
// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

// Import du routeur API
const apiRouter = require("./routers/api/router");

app.use("/api", apiRouter);

// Configuration de production
/*
const path = require("path");

const reactBuildPath = path.join(__dirname, "/../../client/dist");
const publicFolderPath = path.join(__dirname, "/../public");

app.use(express.static(reactBuildPath));
app.get("*.*", express.static(publicFolderPath, { maxAge: "1y" }));
app.get("*", (_, res) => {
  res.sendFile(path.join(reactBuildPath, "/index.html"));
});
*/

// Middleware de gestion des erreurs
/*
const logErrors = (err, req, res, next) => {
  console.error(err);
  console.error("sur req:", req.method, req.path);
  next(err);
};

app.use(logErrors);
*/

module.exports = app;
