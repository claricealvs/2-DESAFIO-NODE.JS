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

// Teste de rota
app.get('/', (req, res) => {
  res.send('Hello World!');
});

    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error: Error) => {
    console.error('Error during Data Source initialization:', error);
  });
  
// Iniciar a conexão com o banco de dados e o servidor
app.listen(3000, async () => {
  await connect();
});