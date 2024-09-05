// src/database/entities/Session.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Ticket } from './Ticket';
import { Movie } from './Movie';

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

  @ManyToOne(() => Movie, (movie) => movie.sessions)
  @JoinColumn({ name: 'movie_id' }) // Certifique-se de que o nome da coluna está correto
  movie!: Movie;

  @OneToMany(() => Ticket, (ticket) => ticket.session)
  tickets!: Ticket[];
}
