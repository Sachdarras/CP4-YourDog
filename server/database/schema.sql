-- SQLBook: Code
CREATE TABLE roles (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nom VARCHAR(255) NOT NULL
);
INSERT INTO roles (nom) VALUES ('admin'), ('user'), ('pro');
CREATE TABLE user (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  nom VARCHAR(255) NOT NULL,
  prenom VARCHAR(255) NOT NULL,
  adresse VARCHAR(255) NOT NULL,
  ville VARCHAR(255) NOT NULL,
  code_postal INT NOT NULL,
  role_id INT UNSIGNED NOT NULL default 2,
  FOREIGN KEY (role_id) REFERENCES roles(id)
);
INSERT INTO user (email, password, nom, prenom, adresse, ville, code_postal, role_id) 
VALUES ('admin@admin.fr', '$argon2id$v=19$m=65536,t=3,p=4$B2wqnQTNSM1QQalDtljrWA$XxUXFDyuY4wD2uBmD0srPiFOqClYPZ/D2L0GPGS6JWw', 'admin', 'admin', 'admin', 'admin', '73000', '1'),
('sachdarras@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$avCumhyHUWc//LhNnZfR1Q$KWFoA+4xyjqTj3GjUWkftAZt86pF0M8MI3MEjJIn5PQ', 'DARRAS', 'Sacha', '12, venelle des pommiers', 'Pont-croix', '29790', '2');
CREATE TABLE activity_sport (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  nom VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  description TEXT not null,
  lieux TEXT NOT NULL
);

CREATE TABLE promenade (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  latitude DECIMAL(25, 15) NOT NULL, 
  longitude DECIMAL(25, 15) NOT NULL,
  lieu VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  name VARCHAR(255) NOT NULL
);
INSERT INTO promenade (latitude, longitude, lieu, description, name) 
VALUES (48.039146123639554, -4.473767291890532, 'Pont Croix', 'Balade entre forêt et champ au bord de la rivière du Goyen', 'Kermaria');

CREATE TABLE dogfriendly (
  id INT UNSIGNED PRIMARY KEY AUTO_INCREMENT NOT NULL,
  adresse TEXT NOT NULL,
  type VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  price INT NULL
);

