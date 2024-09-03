// src/database/entities/Session.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique } from 'typeorm';

@Entity('sessions') // Nome da tabela no banco de dados
@Unique(['room', 'time']) // unicidade
export class Session {
  @PrimaryGeneratedColumn() // Campo da chave primária que é gerado automaticamente
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
