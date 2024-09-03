import express from 'express';
import { AppDataSource } from './data-source';
import dotenv from 'dotenv';

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
AppDataSource.initialize()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error);
  });
  