// src/database/entities/Session.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('sessions') // Nome da tabela no banco de dados
@Unique(['room', 'time'])
export class Session {
  @PrimaryGeneratedColumn('uuid') // Campo da chave primária que é gerado automaticamente
  id!: number;

  /*
  @Column()
  movie_id!: number;
  */
  @Column()
  room!: string;

  @Column()
  capacity!: number;

  @Column()
  day!: string;

  @Column()
  time!: string;
}
