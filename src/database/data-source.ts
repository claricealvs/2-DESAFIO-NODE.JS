import { DataSource } from 'typeorm';
import { Movie } from '../database/entities/Movie'; // Certifique-se de que a importação está correta
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database:
    process.env.DATABASE_URL?.split(':')[1] || './src/database/db.sqlite',
  entities: [Movie], // Aqui você pode adicionar mais entidades, se necessário
  migrations: [__dirname + '/migrations/*.ts'],
  //synchronize: true, // Mantenha como true apenas em desenvolvimento
});

AppDataSource.initialize()
  .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso!');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados:', error);
  });
