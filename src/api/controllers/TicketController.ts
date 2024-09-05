import { Request, Response } from 'express';
import { TicketService } from '../services/TicketServices';

export class TicketController {
  private ticketService = new TicketService();

  async createTicket(req: Request, res: Response) {
    try {
      const { chair, value } = req.body;
      //   const movie_id = req.params.movie_id;
      //   const session_id = req.params.session_id;

      const ticket = await this.ticketService.createTicket(
        chair,
        value,
        //movie_id,
        //session_id,
      );

      return res.status(201).json(ticket);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }

  async updateTicket(req: Request, res: Response) {
    try {
      const { chair, value } = req.body;
      //   const movie_id = req.params.movie_id;
      //   const session_id = req.params.session_id;
      const id = req.params.id;

      const ticket = await this.ticketService.updateTicket(id, chair, value);

      return res.status(200).json(ticket);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }

  async deleteTicket(req: Request, res: Response) {
    try {
      const id = req.params.id;

      await this.ticketService.deleteTicket(id);

      return res.status(200).json({ message: 'Ingresso deletado com sucesso.' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }
}
