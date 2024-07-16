const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const [result] = await this.database.query(
      `insert into ${this.table} (email, password, nom, prenom, adresse, ville, code_postal) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        user.email,
        user.password,
        user.nom,
        user.prenom,
        user.adresse,
        user.ville,
        user.code_postal,
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

  async update(id, user) {
    const [result] = await this.database.query(
      `update ${this.table} set email = ?, password = ?, nom = ?, prenom = ?, adresse = ?, ville = ?, code_postal = ? where id = ?`,
      [
        user.email,
        user.password,
        user.nom,
        user.prenom,
        user.adresse,
        user.ville,
        user.code_postal,
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

module.exports = UserRepository;
