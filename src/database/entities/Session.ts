// src/database/entities/Session.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sessions') // Nome da tabela no banco de dados
export class Session {
  @PrimaryGeneratedColumn('uuid') // Campo da chave primária que é gerado automaticamente
  id!: number;

  @Column()
  movie_id!: number;

  @Column()
  room!: string;

  @Column()
  capacity!: number;

  @Column()
  day!: string;

  @Column()
  time!: string;
}

/*

	"id": 1,
  "movie_id": 1,
  "room": "nome_da_sala",
  "capacity": 100,
  "day": "03/06/2024",
  "time": "14:23:00"

*/
