const express = require("express");

const cors = require("cors");

const app = express();

// Gestion CORS pour autoriser les requêtes depuis votre frontend React
app.use(
  cors({
    origin: process.env.CLIENT_URL, // Définissez cette variable dans votre .env
    methods: ["GET", "POST", "PUT", "DELETE"], // Ajoutez les méthodes que vous utilisez
    allowedHeaders: ["Content-Type", "Authorization"], // Ajoutez les headers nécessaires
  })
);

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Importez votre routeur API
const apiRouter = require("./routers/api/router");

app.use("/api", apiRouter);

// Middleware de gestion des erreurs (facultatif)
/*
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});
*/

module.exports = app;
