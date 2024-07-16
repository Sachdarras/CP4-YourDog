const tables = require("../../database/tables");

const browse = async (req, res, next) => {
  try {
    const activities = await tables.activity_sport.readAll();
    res.json(activities);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const activity = await tables.activity_sport.read(req.params.id);
    if (activity == null) {
      res.sendStatus(404);
    } else {
      res.json(activity);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const activity = req.body;
  try {
    const insertId = await tables.activity_sport.create(activity);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const activity = req.body;
  try {
    const updateId = await tables.activity_sport.update(
      req.params.id,
      activity
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
    const deleteId = await tables.activity_sport.delete(req.params.id);
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
