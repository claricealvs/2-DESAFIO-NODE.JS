// src/database/entities/Ticket.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('tickets') // Nome da tabela no banco de dados
export class Ticket {
  @PrimaryGeneratedColumn() // Campo da chave primária que é gerado automaticamente
  id!: string;

  @Column()
  session_id!: number;

  @Column()
  chair!: string;

  @Column()
  value!: number;
}

/*
"id": 1,
  "session_id": 1,
  "chair": "b1",
  "value": 10
*/
