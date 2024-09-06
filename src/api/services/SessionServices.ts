import { Repository } from 'typeorm';
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

    if (existingSession) {
      throw new Error(
        'Sessões não podem ocorrer no mesmo horário e na mesma sala.',
      );
    }

    const movie = await this.movieRepository.findOne(movie_id);

    if (!movie) {
      throw new Error('Filme não encontrado.');
    }

    const regexDay = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (regexDay.test(day) === false) {
      throw new Error('Data inválida.');
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
    // Verificar se a sessão já existe
    const existingSession = await this.sessionRepository.findOne({
      where: { room, time },
    });

    if (existingSession) {
      throw new Error('Sessões não podem ocorrer no mesmo horário.');
    }

    const regexDay = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    if (regexDay.test(day) === false) {
      throw new Error('Data inválida.');
    }

    await this.sessionRepository.update(id, {
      room,
      capacity,
      day,
      time,
    });

    const updateSession = await this.sessionRepository.findOne({
      where: { id },
    });

    if (!updateSession) {
      throw new Error('Erro ao atualizar a sessão.');
    }

    return updateSession;
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
