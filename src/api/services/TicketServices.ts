import { AppDataSource } from "../../database/data-source";
import { Ticket } from "../../database/entities/Ticket";

export class TicketService {
    private ticketRepository = AppDataSource.getRepository(Ticket);

    async createTicket(
        movieId: number,
        sessionId: number,
        chair: string,
        value: number,
    
    
    ): Promise<Ticket>{
        const ticket = this.ticketRepository.create(
            {
                movieId, 
                sessionId,
                chair,
                value,
            }
        );

        await this.ticketRepository.save(ticket);

        return ticket;
    }
}