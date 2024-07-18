const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

// Options de hachage
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10, // 19 Mio en kio (19 * 1024 kio)
  timeCost: 2,
  parallelism: 1,
};

// Fonction pour enregistrer un nouvel utilisateur
const register = async (userData) => {
  const { email, hashedPassword } = userData;
  try {
    return { email, hashedPassword };
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error("Failed to register user");
  }
};

// Middleware de hachage du mot de passe
const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashedPassword = hashedPassword; // Stocke le mot de passe haché dans req.body.hashedPassword
    next();
  } catch (err) {
    next(err);
  }
};

// Middleware de vérification du token JWT dans les cookies
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.auth_token; // Récupère le token des cookies
    if (!token) {
      throw new Error("Token is missing");
    }
    const decodedToken = jwt.verify(token, process.env.APP_SECRET);
    req.auth = decodedToken;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Middleware pour vérifier l'utilisateur actuel
const currentUser = (req, res, next) => {
  if (req.auth.userId === +req.params.id) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
};

// Fonction de connexion pour générer et définir le cookie JWT
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Récupère l'utilisateur depuis la base de données en utilisant l'email
    const user = await tables.user.readByEmailWithPassword(email);

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Vérifie le mot de passe avec Argon2
    const passwordValid = await argon2.verify(user.password, password);

    if (!passwordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Supprime le mot de passe haché de l'objet utilisateur avant de le renvoyer
    delete user.password;

    // Crée un token JWT signé
    const token = jwt.sign(
      { userId: user.id, rolesId: user.roles_id },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );

    // Définit le cookie avec le token JWT
    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict", // Contrôle de la politique SameSite
    });

    // Répond avec le token et les données de l'utilisateur
    return res.json({
      token,
      user,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  hashPassword,
  verifyToken,
  currentUser,
  login,
};
