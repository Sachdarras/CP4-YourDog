const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const apiRouter = require("./routers/api/router");
const authRouter = require("./routers/api/auth/router"); // Assurez-vous du chemin correct

const app = express();

// Middleware CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Permet l'utilisation des cookies avec les requêtes cross-origin
  })
);

// Middleware pour analyser le corps des requêtes en JSON
app.use(express.json());

// Middleware pour analyser les cookies
app.use(cookieParser());

// Utilisation des routeurs
app.use("/api", apiRouter);
app.use("/auth", authRouter); // Utilise le routeur d'authentification

// Gestion des erreurs (facultatif)
/*
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Internal Server Error" });
});
*/

module.exports = app;
