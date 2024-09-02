// src/database/entities/Movie.ts

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('movies') // Nome da tabela no banco de dados
export class Movie {
  @PrimaryGeneratedColumn() // Campo da chave primária que é gerado automaticamente
  id!: number; // Usando o operador de afirmação para indicar que será inicializado mais tarde

  @Column() // Nome do filme
  name!: string;

  @Column() // Descrição do filme
  description!: string;

  @Column('text') // Armazena uma lista de atores como um array simples
  actors!: string[];

  @Column() // Gênero do filme
  genre!: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' }) // Data de criação
  createdAt!: Date;
}
