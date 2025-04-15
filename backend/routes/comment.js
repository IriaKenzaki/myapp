import express from 'express';
import { authenticateToken } from '../middleware/authMiddleware.js';
import Comment from '../models/commentModel.js';

const router = express.Router();

router.post('/comment', authenticateToken, async (req, res) => {
  const { content } = req.body;
  const username = req.user.username;

  if (!content) {
    return res.status(400).json({ error: 'Le contenu du commentaire est requis' });
  }

  try {
    const newComment = new Comment({ username, content });
    await newComment.save();
    res.status(201).json({ message: 'Commentaire ajouté avec succès' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de l\'ajout du commentaire' });
  }
});

export default router;
