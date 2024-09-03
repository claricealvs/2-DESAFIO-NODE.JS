import express from 'express';
import { AppDataSource } from './database/data-source'; // Importando a instância do DataSource
import moviesRoutes from './routes/movieRoutes';
import 'reflect-metadata';

const app = express();
app.use(express.json());

AppDataSource.initialize() // Inicializa o DataSource
  .then(async () => {
    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect(); // Conectar ao queryRunner

    await queryRunner.release(); // Liberar o queryRunner após a operação

    app.use('/api', moviesRoutes);

    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error) => console.log('Erro ao conectar ao banco de dados:', error));
