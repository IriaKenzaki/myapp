import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });
import authRoutes from './routes/auth.js';
import protectedRoutes from './routes/protected.js';
import commentRoutes from './routes/comment.js';

dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.send('Bienvenue sur l\'API');
  });
  
  app.use(cors());
  app.use(express.json()); 
  
  app.use('/auth', authRoutes);  
  app.use('/protected', protectedRoutes); 
  app.use('/comment', commentRoutes); 
  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`Serveur en cours sur le port ${PORT}`));