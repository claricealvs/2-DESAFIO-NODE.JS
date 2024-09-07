import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Ticket } from '../../database/entities/Ticket';
import { Movie } from '../../database/entities/Movie';
import { Session } from '../../database/entities/Session';

export class TicketService {
  private ticketRepository!: Repository<Ticket>;
  private movieRepository!: Repository<Movie>;
  private sessionRepository!: Repository<Session>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.ticketRepository = connection.getRepository(Ticket);
    this.movieRepository = connection.getRepository(Movie);
  }

  async createTicket(
    movie_id: number,
    session_id: number,
    chair: string,
    value: number,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create({
      movie_id,
      session_id,
      chair,
      value,
    });

    await this.ticketRepository.save(ticket);

    return ticket;
  }

  async updateTicket(
    id: string,
    movie_id: number,
    session_id: number,
    chair: string,
    value: number,
  ): Promise<void> {
    const existingTicket = await this.ticketRepository.findOne({
      where: { id },
    });

    if (!existingTicket) {
      throw new Error('O ingresso não existe.');
    }

    await this.ticketRepository.update(id, {
      movie_id,
      session_id,
      chair,
      value,
    });
  }

  async deleteTicket(id: string): Promise<void> {
    const existingTicket = await this.ticketRepository.findOne({
      where: { id },
    });

    if (!existingTicket) {
      throw new Error('O ingresso não existe.');
    }

    await this.ticketRepository.delete(id);
  }

  async getTicketById(id: string): Promise<Ticket | undefined> {
    const ticket = this.ticketRepository.findOne({ where: { id } });
    if (!ticket) {
      throw new Error('O ingresso não existe.');
    } else {
      return ticket;
    }
  }

  async disponibleChair(chair: string): Promise<boolean> {
    const ticket = await this.ticketRepository.findOne({ where: { chair } });
    return !!ticket;
  }

  async verifySession(session_id: number): Promise<boolean> {
    const session = await this.sessionRepository.findOne({
      where: { id: session_id },
    });

    if (!session) {
      return false;
    }
    return true;
  }

  async verifyMovie(movie_id: number): Promise<boolean> {
    const movie = await this.movieRepository.findOne({
      where: { id: movie_id },
    });

    if (!movie) {
      throw new Error('O filme não existe.');
    } else {
      return true;
    }
  }

  /* adicionar service que confere a capacidade e vê se está excedida */
  async sessionFull(session_id: number): Promise<boolean> {
    const sessionExists = this.verifySession(session_id);
    if (!sessionExists) {
      //retorna erro
    }

    const sessionCapacity = await parseInt(
      this.sessionRepository
        .createQueryBuilder()
        .where({
          where: { id: session_id },
        })
        .getQuery(),
    );

    //pegar quantidade de tickets que já estão nessa sessao
    const ticketsInSession = await this.ticketRepository.count({
      where: { session_id },
    });

    if (sessionCapacity <= ticketsInSession) {
      return false;
    }
    return true;
  }
}
