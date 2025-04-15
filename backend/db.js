import pkg from 'pg';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });


const { Pool } = pkg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

import mongoose from 'mongoose';

const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connecté');
  } catch (err) {
    console.error('Erreur MongoDB:', err);
    process.exit(1);
  }
};

connectMongoDB();

export { mongoose };