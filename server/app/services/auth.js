const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

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

// Middleware de vérification du token JWT
const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");
    if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
      throw new Error("Authorization header is missing or invalid");
    }
    const token = authorizationHeader.split(" ")[1];
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

module.exports = {
  register,
  hashPassword,
  verifyToken,
  currentUser,
};
