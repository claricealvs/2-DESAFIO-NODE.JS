import { Request, Response } from 'express';
import { TicketService } from '../services/TicketServices';

export class TicketController {
  private ticketService = new TicketService();

  async createTicket(req: Request, res: Response) {
    try {
      const { chair, value } = req.body;
      const movie_id = req.params.movie_id;
      const session_id = req.params.session_id;

      const ticket = await this.ticketService.createTicket(
        chair,
        value,
        movie_id,
        session_id,
      );

      return res.status(201).json(ticket);
    } catch (error: err) {
      return res.status(400).json({ message: error.message });
    }
  }
}
