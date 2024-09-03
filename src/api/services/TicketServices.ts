import { AppDataSource } from "../../data-source";
import { Ticket } from "../../database/entities/Ticket";

export class TicketService {
    private ticketRepository = AppDataSource.getRepository(Ticket)

    async createTicket(movieId:number, sessionId:number):json{
        const ticket = this.ticketRepository.create(
            {
                movieId:movieId, 
                sessionId:sessionId
            }
        )
    }
}