-- init.sql

CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'user'
);

-- Insérer un utilisateur de test (optionnel)
INSERT INTO users (username, password, role)
VALUES ('admin', '$2b$10$M1rLwL2.D3vmtcM8bZg.5u9I7v9UV5Uw2fT2.c6uYxkp6m4qHZRUy', 'admin'); -- mot de passe: 'admin123'

