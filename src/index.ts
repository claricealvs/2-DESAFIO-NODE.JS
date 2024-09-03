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

    // Criar a tabela se não existir
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS temporary_movies (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        name VARCHAR NOT NULL,
        description VARCHAR NOT NULL,
        actors TEXT NOT NULL,
        genre VARCHAR NOT NULL,
        createdAt DATETIME NOT NULL DEFAULT (CURRENT_TIMESTAMP)
      )
    `);

    await queryRunner.release(); // Liberar o queryRunner após a operação

    app.use('/api', moviesRoutes, sessionRoutes, ticketRoutes);

    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error) => console.log('Erro ao conectar ao banco de dados:', error));
