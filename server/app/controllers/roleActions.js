const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const roles = await tables.roles.readAll();
    res.json(roles);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const role = await tables.roles.read(req.params.id);
    if (role == null) {
      res.sendStatus(404);
    } else {
      res.json(role);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const role = req.body;
  try {
    const insertId = await tables.roles.create(role);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const role = req.body;
  try {
    const updateId = await tables.roles.update(req.params.id, role);
    if (updateId == null) {
      res.sendStatus(404);
    } else {
      res.json({ updateId });
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  try {
    const deleteId = await tables.roles.delete(req.params.id);
    if (deleteId == null) {
      res.sendStatus(404);
    } else {
      res.json({ deleteId });
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
};
