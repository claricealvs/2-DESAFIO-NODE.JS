import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import './database/connection';
import connect from './database/connection';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Teste de rota
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Iniciar a conexão com o banco de dados e o servidor
app.listen(port, async () => {
  await connect();
});
