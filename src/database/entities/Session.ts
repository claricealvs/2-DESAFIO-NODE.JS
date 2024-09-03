// src/database/entities/Session.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('sessions') // Nome da tabela no banco de dados
@Unique(['room', 'time']) // unicidade
export class Session {
  @PrimaryGeneratedColumn() // Campo da chave primária que é gerado automaticamente
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
