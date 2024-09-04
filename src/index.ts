import express from 'express';
import { AppDataSource } from './database/data-source'; // Importando a instância do DataSource
import moviesRoutes from './routes/movieRoutes';
import sessionRoutes from './routes/sessionRoutes';
import ticketRoutes from './routes/ticketRoutes';
import 'reflect-metadata';

const app = express();
app.use(express.json());

AppDataSource.initialize() // Inicializa o DataSource
  .then(async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect(); // Conectar ao queryRunner

    await queryRunner.release(); // Liberar o queryRunner após a operação

    app.use('/api', moviesRoutes, sessionRoutes, ticketRoutes);

    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error: Error) => {
    console.error('Error during Data Source initialization:', error);
  });
  
