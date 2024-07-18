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

  // Exemple de logique d'enregistrement dans la base de données
  // const newUser = await User.create({ email, hashedPassword });
  // return newUser;

  // Pour l'exemple, nous allons simplement renvoyer les données d'utilisateur fournies
  return { email, hashedPassword }; // Inclure hashedPassword ici
};

// Middleware de hachage du mot de passe
const hashPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    const hashedPassword = await argon2.hash(password, hashingOptions);
    req.body.hashedPassword = hashedPassword; // Stocker le mot de passe haché dans req.body.hashedPassword
    next();
  } catch (err) {
    next(err);
  }
};

// Middleware de vérification du token JWT dans les cookies
const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.auth_token; // Récupérer le token des cookies
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

// Fonction pour trouver un utilisateur par email
const findUserByEmail = async (email) => {
  try {
    const user = await tables.user.readByEmail(email);
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Failed to find user by email");
  }
};

// Fonction de connexion pour générer et définir le cookie JWT
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Récupère l'utilisateur depuis la base de données en utilisant l'email
    const user = await findUserByEmail(email);

    if (user && (await argon2.verify(user.hashedPassword, password))) {
      const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET, {
        expiresIn: "1h",
      });
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      });
      res.status(200).json({ message: "Logged in successfully" });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  register,
  hashPassword,
  verifyToken,
  currentUser,
  login,
};
