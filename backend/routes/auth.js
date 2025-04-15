import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import sanitizeHtml from 'sanitize-html';
import { pool } from '../db.js';

const router = express.Router();

const usernameRegex = /^[a-zA-Z0-9_]{3,30}$/; 
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;  

router.post('/register', async (req, res) => {
  let { username, password } = req.body;
  
  username = sanitizeHtml(username);
  password = sanitizeHtml(password);  

  if (!usernameRegex.test(username)) {
    return res.status(400).json({ error: 'Nom d\'utilisateur invalide. Utilisez seulement des lettres, des chiffres et des underscores.' });
  }

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ error: 'Le mot de passe doit contenir au moins 8 caractères, une lettre et un chiffre.' });
  }

  const hashed = await bcrypt.hash(password, 10);
  try {
    await pool.query(
      'INSERT INTO users (username, password, role) VALUES ($1, $2, $3)',
      [username, hashed, 'user']
    );
    res.status(201).json({ message: 'Utilisateur créé' });
  } catch (err) {
    res.status(400).json({ error: 'Utilisateur existant ou erreur' });
  }
});

router.post('/login', async (req, res) => {
  let { username, password } = req.body;
  
  username = sanitizeHtml(username);  
  password = sanitizeHtml(password);  

  const result = await pool.query('SELECT * FROM users WHERE username=$1', [username]);
  const user = result.rows[0];
  if (!user) return res.status(401).json({ error: 'Utilisateur introuvable' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(403).json({ error: 'Mot de passe invalide' });

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
