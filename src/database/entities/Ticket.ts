// src/database/entities/Ticket.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Session } from './Session';
import { Movie } from './Movie';

@Entity('tickets') // Nome da tabela no banco de dados
export class Ticket {
  @PrimaryGeneratedColumn() // Campo da chave primária que é gerado automaticamente
  id!: number;

  @Column()
  chair!: string;

  @Column()
  value!: number;

  @Column()
  session_id!: number;

  @Column()
  movie_id!: number;

  @ManyToOne(() => Session, (session) => session.tickets)
  @JoinColumn({ name: 'session_id' })
  session!: Session;
}
//   @OneToOne(() => Movie, (movie) => movie.tickets)
//   @JoinColumn({ name: 'movie_id' })
//   movie!: Movie;
// }

/*
"id": 1,
  "session_id": 1,
  "chair": "b1",
  "value": 10
*/
