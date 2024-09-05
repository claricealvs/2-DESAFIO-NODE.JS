// src/database/entities/Movie.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Session } from './Session';

@Entity('movies') // Nome da tabela no banco de dados
export class Movie {
  @PrimaryGeneratedColumn() // Campo da chave primária que é gerado automaticamente
  id!: number;

  @Column()
  name!: string;

  @Column()
  description!: string;

  @Column()
  actors!: string;

  @Column()
  genre!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  release_date!: Date;

  @OneToMany(() => Session, (session) => session.movie)
  sessions!: Session[];
}
