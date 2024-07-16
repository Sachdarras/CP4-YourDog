const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const dogfriendlys = await tables.dogfriendly.readAll();
    res.json(dogfriendlys);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const dogfriendly = await tables.dogfriendly.read(req.params.id);
    if (dogfriendly == null) {
      res.sendStatus(404);
    } else {
      res.json(dogfriendly);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const dogfriendly = req.body;
  try {
    const insertId = await tables.dogfriendly.create(dogfriendly);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const dogfriendly = req.body;
  try {
    const updateId = await tables.dogfriendly.update(
      req.params.id,
      dogfriendly
    );
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
    const deleteId = await tables.dogfriendly.delete(req.params.id);
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
