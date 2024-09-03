import { AppDataSource } from '../../database/data-source';
import { Session } from '../../database/entities/Session';

export class SessionService {
  private sessionRepository = AppDataSource.getRepository(Session);

  async getAllSessions() {
    try {
      return await this.sessionRepository.find();
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Error retrieving sessions: ${error.message}`);
      } else {
        throw new Error(`Unkdown error retrieving sessions`);
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
      throw new Error('Sessão já cadastrada.');
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