import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Session } from '../../database/entities/Session';

export class SessionService {
  private sessionRepository!: Repository<Session>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.sessionRepository = connection.getRepository(Session);
  }

  async getAllSessions() {
    try {
      return await this.sessionRepository.find();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving sessions: ${error.message}`);
      } else {
        throw new Error(`Unknown error retrieving sessions`);
      }
    }
  }

  async createSession(
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
      throw new Error('Sessões não podem ocorrer no mesmo horário.');
    }

    const newSession = this.sessionRepository.create({
      room,
      capacity,
      day,
      time,
    });

    // Salvar no banco de dados
    await this.sessionRepository.save(newSession);

    return newSession;
  }
}
