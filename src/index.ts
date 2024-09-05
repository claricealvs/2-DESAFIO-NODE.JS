import 'reflect-metadata';
import express from 'express';
import dotenv from 'dotenv';
import connect from './database/connection';
import moviesRoutes from './routes/movieRoutes';
import sessionRoutes from './routes/sessionRoutes';
import ticketRoutes from './routes/ticketRoutes';

dotenv.config();

const app = express();
app.use(express.json());

// Middleware para rotas
app.use('/api', moviesRoutes, sessionRoutes, ticketRoutes);

async function startServer() {
  try {
    // Iniciar a conexão com o banco de dados
    await connect();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');

    // Iniciar o servidor
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

// Chamar a função para iniciar o servidor
startServer();
