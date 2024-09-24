// src/database/entities/Ticket.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Session } from './Session';

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

  @ManyToOne(() => Session, (session) => session.tickets)
  @JoinColumn({ name: 'session_id' })
  session!: Session;
}
