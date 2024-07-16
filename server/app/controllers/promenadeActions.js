const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const promenades = await tables.promenade.readAll();
    res.json(promenades);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const promenade = await tables.promenade.read(req.params.id);
    if (promenade == null) {
      res.sendStatus(404);
    } else {
      res.json(promenade);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const promenade = req.body;
  try {
    const insertId = await tables.promenade.create(promenade);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const promenade = req.body;
  try {
    const updateId = await tables.promenade.update(req.params.id, promenade);
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
    const deleteId = await tables.promenade.delete(req.params.id);
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
