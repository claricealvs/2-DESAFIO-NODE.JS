import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Ticket } from '../../database/entities/Ticket';
import { Movie } from '../../database/entities/Movie';

export class TicketService {
  private ticketRepository!: Repository<Ticket>;
  private movieRepository!: Repository<Movie>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.ticketRepository = connection.getRepository(Ticket);
    this.movieRepository = connection.getRepository(Movie);
  }

  async createTicket(
    //movie_id: number,
    session_id: number,
    chair: string,
    value: number,
  ): Promise<Ticket> {
    const ticket = this.ticketRepository.create({
      //movie_id,
      session_id,
      chair,
      value,
    });

    await this.ticketRepository.save(ticket);

    return ticket;
  }

  async updateTicket(
    id: string,
    // movieId: number,
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
      // movieId,
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
    const session = await this.movieRepository.findOne({
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
}
