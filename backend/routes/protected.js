import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { authorizeRole } from '../middleware/roleMiddleware.js';
import { pool } from '../db.js';

const router = express.Router();

router.get('/home', authenticateToken, (req, res) => {
  res.json({ message: `Bienvenue ${req.user.username} !`, role: req.user.role });
});

router.get('/admin', authenticateToken, authorizeRole('admin'), async (req, res) => {
  const result = await pool.query("SELECT id, username FROM users WHERE role != 'admin'");
  res.json(result.rows);
});

export default router;
