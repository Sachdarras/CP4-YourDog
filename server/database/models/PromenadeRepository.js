const AbstractRepository = require("./AbstractRepository");

class PromenadeRepository extends AbstractRepository {
  constructor() {
    super({ table: "promenade" });
  }

  async create(promenade) {
    const [result] = await this.database.query(
      `insert into ${this.table} (latitude, longitude, lieu,description, name) values (?, ?, ?, ?, ?)`,
      [
        promenade.latitude,
        promenade.longitude,
        promenade.lieu,
        promenade.description,
        promenade.name,
      ]
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

  async update(id, promenade) {
    const [result] = await this.database.query(
      `update ${this.table} set latitude = ?, longitude = ?, lieu = ?, name = ? where id = ?`,
      [
        promenade.latitude,
        promenade.longitude,
        promenade.lieu,
        promenade.name,
        id,
      ]
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

module.exports = PromenadeRepository;
