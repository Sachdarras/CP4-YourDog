const AbstractRepository = require("./AbstractRepository");

class ActivitySportRepository extends AbstractRepository {
  constructor() {
    super({ table: "activity_sport" });
  }

  async create(activity) {
    const [result] = await this.database.query(
      `insert into ${this.table} (nom, date, lieux) values (?, ?, ?)`,
      [activity.nom, activity.date, activity.lieux]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`select * from ${this.table}`);
    return rows;
  }

  async update(id, activity) {
    const [result] = await this.database.query(
      `update ${this.table} set nom = ?, date = ?, lieux = ? where id = ?`,
      [activity.nom, activity.date, activity.lieux, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = ActivitySportRepository;
