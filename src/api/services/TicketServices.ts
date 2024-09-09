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
    this.sessionRepository = connection.getRepository(Session);
    this.movieRepository = connection.getRepository(Movie);
  }

  async createTicket(
    session_id: number,
    chair: string,
    value: number,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create({
      session_id,
      chair,
      value,
    });

    await this.ticketRepository.save(ticket);

    return ticket;
  }

  async updateTicket(
    id: number,
    movie_id: number,
    session_id: number,
    chair: string,
    value: number,
  ) {
    const existingTicket = await this.ticketRepository.findOne({
      where: { id },
    });

    if (!existingTicket) {
      throw new Error('O ingresso não existe.');
    }

    const updatedTicket = {
      id,
      session_id,
      chair,
      value,
    };
    await this.ticketRepository.update(id, {
      // movieId,
      session_id,
      chair,
      value,
    });

    return updatedTicket;
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

  async disponibleChair(chair: string, session_id: number): Promise<boolean> {
    const ticket = await this.ticketRepository.findOne({
      where: { chair, session_id },
    });
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
      return false;
    } else {
      return true;
    }
  }

  /* adicionar service que confere a capacidade e vê se está excedida */
  async sessionFull(session_id: number): Promise<boolean> {
    const session = await this.sessionRepository.findOne({
      where: { id: session_id },
      select: ['capacity'], // Assumindo que a entidade 'Session' tem o campo 'capacity'
    });

    if (!session) {
      throw new Error('A sessão não foi encontrada.');
    }

    const sessionCapacity = session.capacity;

    // Contar quantos ingressos já estão nessa sessão
    const ticketsInSession = await this.ticketRepository.count({
      where: { session_id },
    });

    // Verificar se a sessão está cheia
    return ticketsInSession >= sessionCapacity;
  }
}
