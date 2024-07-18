const AbstractRepository = require("./AbstractRepository");

class DogFriendlyRepository extends AbstractRepository {
  constructor() {
    super({ table: "dogfriendly" });
  }

  async create(dogfriendly) {
    const { adresse, ville, codePostal, name, type, description, price } =
      dogfriendly;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (adresse, ville, code_postal, name, type, description, price) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [adresse, ville, codePostal, name, type, description, price]
    );
    return result.insertId;
  }

  async read(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  async readAll() {
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);
    return rows;
  }

  async update(id, dogfriendly) {
    const { adresse, ville, codePostal, name, type, description, price } =
      dogfriendly;
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET adresse = ?, ville = ?, code_postal = ?, name = ?, type = ?, description = ?, price = ? WHERE id = ?`,
      [adresse, ville, codePostal, name, type, description, price, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }
}

module.exports = DogFriendlyRepository;
