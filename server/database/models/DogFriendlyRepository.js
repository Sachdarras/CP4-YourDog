const AbstractRepository = require("./AbstractRepository");

class DogFriendlyRepository extends AbstractRepository {
  constructor() {
    super({ table: "dogfriendly" });
  }

  async create(dogfriendly) {
    const [result] = await this.database.query(
      `insert into ${this.table} (adresse, type, price) values (?, ?, ?)`,
      [dogfriendly.adresse, dogfriendly.type, dogfriendly.price]
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

  async update(id, dogfriendly) {
    const [result] = await this.database.query(
      `update ${this.table} set adresse = ?, type = ?, price = ? where id = ?`,
      [dogfriendly.adresse, dogfriendly.type, dogfriendly.price, id]
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

module.exports = DogFriendlyRepository;
