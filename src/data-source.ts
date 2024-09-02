import { DataSource } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database:
    process.env.DATABASE_URL?.split(':')[1] || './src/database/db.sqlite',
  entities: [__dirname + '/entity/*.ts'],
  synchronize: true,
});
