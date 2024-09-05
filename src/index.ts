import 'reflect-metadata';
import express from 'express';
import moviesRoutes from './routes/movieRoutes';
import sessionRoutes from './routes/sessionRoutes';
import ticketRoutes from './routes/ticketRoutes';
import dotenv from 'dotenv';
import connect from './database/connection';

dotenv.config();

const app = express();
app.use(express.json());

// rotas de movies, session e ticket
app.use('/api', moviesRoutes, sessionRoutes, ticketRoutes);

// Iniciar a conexão com o banco de dados e o servidor
app.listen(3000, async () => {
  await connect();
  console.log('Servidor rodando na porta 3000');
});
