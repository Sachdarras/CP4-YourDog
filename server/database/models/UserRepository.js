const argon2 = require("argon2");
const AbstractRepository = require("./AbstractRepository");

class UserRepository extends AbstractRepository {
  constructor() {
    super({ table: "user" });
  }

  async create(user) {
    const { email, password, nom, prenom, adresse, ville, codePostal } = user;

    const hashedPassword = await argon2.hash(password); // Hashage du mot de passe

    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (email, password, nom, prenom, adresse, ville, code_postal) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [email, hashedPassword, nom, prenom, adresse, ville, codePostal]
    );

    return result.insertId;
  }

  async update(id, user) {
    const { email, password, nom, prenom, adresse, ville, codePostal } = user;

    // Vérifie si le mot de passe a été fourni et le hash s'il est présent
    if (password) {
      const hashedPassword = await argon2.hash(password); // Hashage du mot de passe
      const [result] = await this.database.query(
        `UPDATE ${this.table} SET email = ?, password = ?, nom = ?, prenom = ?, adresse = ?, ville = ?, code_postal = ? WHERE id = ?`,
        [email, hashedPassword, nom, prenom, adresse, ville, codePostal, id]
      );
      return result.affectedRows;
    }

    const [result] = await this.database.query(
      `UPDATE ${this.table} SET email = ?, nom = ?, prenom = ?, adresse = ?, ville = ?, code_postal = ? WHERE id = ?`,
      [email, nom, prenom, adresse, ville, codePostal, id]
    );
    return result.affectedRows;
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

  async delete(id) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result.affectedRows;
  }

  async readByEmailWithPassword(email) {
    // Exécute la requête SQL SELECT pour récupérer un utilisateur spécifique par son email
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    // Retourne la première ligne du résultat, qui représente l'utilisateur
    return rows[0];
  }
}

module.exports = UserRepository;
