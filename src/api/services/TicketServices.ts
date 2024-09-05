import { AppDataSource } from "../../database/data-source";
import { Ticket } from "../../database/entities/Ticket";

export class TicketService {
    private ticketRepository = AppDataSource.getRepository(Ticket);

    async createTicket(
        movieId: string,
        sessionId: string,
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

    async updateTicket(
        id: number,
        movieId: number,
        sessionId: number,
        chair: string,
        value: number,
        
        ): Promise<void>{
            const existingTicket = await this.ticketRepository.findOne({ where: { id } });

            if(!existingTicket){
                throw new Error('O ingresso não existe.');
            }

            await this.ticketRepository.update(id, {
                movieId,
                sessionId,
                chair,
                value,
            });
        }
}