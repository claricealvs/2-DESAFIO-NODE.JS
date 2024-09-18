import { Not, Repository } from 'typeorm';
import connect from '../../database/connection';
import { Session } from '../../database/entities/Session';
import { Movie } from '../../database/entities/Movie';

export class SessionService {
  private sessionRepository!: Repository<Session>;
  private movieRepository!: Repository<Movie>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.sessionRepository = connection.getRepository(Session);
    this.movieRepository = connection.getRepository(Movie);
  }

  async getAllSessions() {
    try {
      return await this.sessionRepository.find({
        relations: ['tickets'],
      });
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving sessions: ${error.message}`);
      } else {
        throw new Error(`Unknown error retrieving sessions`);
      }
    }
  }

  async createSession(
    movie_id: number,
    room: string,
    capacity: number,
    day: string,
    time: string,
  ): Promise<Session> {
    // Verificar se a sessão já existe
    const existingSession = await this.sessionRepository.findOne({
      where: { room, time },
    });

    if (![room, day, time, capacity].every((value) => typeof value === null)) {
      throw new Error('Todos os campos são requeridos.');
    }

    if (![room, day, time].every((value) => typeof value === 'string')) {
      throw new Error('Valor incompatível de dados.');
    }

    if (![capacity].every((value) => typeof value === 'number')) {
      throw new Error('Valor incompatível de dados.');
    }

    if (existingSession) {
      throw new Error(
        'Sessões não podem ocorrer no mesmo horário e na mesma sala.',
      );
    }

    const movie = await this.movieRepository.findOne(movie_id);

    if (!movie) {
      throw new Error('Filme não encontrado');
    }

    const regexDay = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (regexDay.test(day) === false) {
      throw new Error('Data inválida.');
    }

    const regexTime = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

    if (regexTime.test(time) === false) {
      throw new Error('Hora inválida.');
    }
    const newSession = this.sessionRepository.create({
      movie_id: movie_id,
      room,
      capacity,
      day,
      time,
    });

    // Salvar no banco de dados
    await this.sessionRepository.save(newSession);

    return newSession;
  }

  async updateSession(
    id: number,
    movie_id: number,
    room: string,
    capacity: number,
    day: string,
    time: string,
  ) {
    // Verificar se há outra sessão no mesmo horário e sala (excluindo a que está sendo atualizada)
    const existingSession = await this.sessionRepository.findOne({
      where: { room, time }, // Garante que não é a mesma sessão
    });

    if (existingSession) {
      throw new Error('Sessões não podem ocorrer no mesmo horário.');
    }

    const movie = await this.movieRepository.findOne(movie_id);

    if (!movie) {
      throw new Error('Filme não encontrado');
    }

    const regexDay = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (regexDay.test(day) === false) {
      throw new Error('Data inválida.');
    }

    const regexTime = /^(?:[01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

    if (regexTime.test(time) === false) {
      throw new Error('Hora inválida.');
    }

    await this.sessionRepository.update(id, {
      room,
      capacity,
      day,
      time,
    });

    // Verificar se a sessão foi realmente atualizada
    const updatedSession = await this.sessionRepository.findOne({
      where: { id },
    });

    if (!updatedSession) {
      throw new Error('Erro ao buscar a sessão atualizada.');
    }

    return updatedSession;
  }

  async deleteSession(id: string): Promise<void> {
    const existingSession = await this.sessionRepository.findOne({
      where: { id },
    });

    if (!existingSession) {
      throw new Error('A sessão inserida não existe.');
    }

    await this.sessionRepository.delete(id);
  }
}
