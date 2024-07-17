const tables = require("../../database/tables");
const { hashPassword } = require("../services/auth");

// The B of BREAD - Browse (Read All) operation
const register = async (req, res, next) => {
  try {
    const { nom, prenom, birthday, adresse, ville, codepostal, email } =
      req.body;

    const newUser = {
      nom,
      prenom,
      birthday,
      adresse,
      ville,
      codePostal: codepostal, // Renommage en camelCase
      email,
      password: await hashPassword(req.hashedPassword), // Utilisation du mot de passe hashé ici
    };

    const insertId = await tables.user.create(newUser);
    res.status(201).json({ insertId });
  } catch (error) {
    next(error);
  }
};

const browse = async (req, res, next) => {
  try {
    const users = await tables.user.readAll();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

// The R of BREAD - Read operation
const read = async (req, res, next) => {
  try {
    const user = await tables.user.read(req.params.id);
    if (user == null) {
      res.sendStatus(404);
    } else {
      res.json(user);
    }
  } catch (err) {
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  const user = req.body;
  try {
    const insertId = await tables.user.create(user);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (req, res, next) => {
  const user = req.body;
  try {
    const updatedRows = await tables.user.update(req.params.id, user);
    if (updatedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (req, res, next) => {
  try {
    const deletedRows = await tables.user.delete(req.params.id);
    if (deletedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  read,
  add,
  edit,
  destroy,
  register,
};
