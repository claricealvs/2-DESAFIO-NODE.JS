import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database:
    process.env.DATABASE_URL?.split(':')[1] || './src/database/db.sqlite',
  entities: [__dirname + '/entities/*.ts'], // Ajuste o caminho para as entidades
  migrations: [__dirname + '/migrations/*.ts'], // Ajuste o caminho para as migrações
  synchronize: true, // Mantenha como true apenas em desenvolvimento
});

// Inicializando a conexão
AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
