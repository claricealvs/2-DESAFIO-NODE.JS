import { Request, Response } from 'express';
import { TicketService } from '../services/TicketServices';

export class TicketController {
  private ticketService = new TicketService();

  async createTicket(req: Request, res: Response) {
    try {
      const { chair, value } = req.body;

      /* verifica se a cadeira ja esta usada */
      const disponibleChair = await this.ticketService.disponibleChair(chair);

      if (disponibleChair) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'A cadeira ' + chair + ' já está ocupada',
        });
      }

      //   const movie_id = req.params.movie_id;
      const session_id = parseInt(req.params.session_id);
      /* verifica se a quantidade de assentos ja esta excedida */

      const ticket = await this.ticketService.createTicket(
        chair,
        value,
        //movie_id,
        session_id,
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

      /* verifica se a cadeira ja esta usada */
      const disponibleChair = await this.ticketService.disponibleChair(chair);

      if (disponibleChair) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'A cadeira ' + chair + ' já está ocupada',
        });
      }

      //   const movie_id = req.params.movie_id;
      const session_id = parseInt(req.params.session_id);

      const id = req.params.id;

      const ticket = await this.ticketService.updateTicket(
        id,
        chair,
        value,
        session_id,
      );

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
      const ticketDeleted = await this.ticketService.getTicketById(id);

      if (!ticketDeleted) {
        return res.status(404).json('O ingresso não existe');
      }

      await this.ticketService.deleteTicket(id);

      return res
        .status(200)
        .json({ message: 'Ingresso deletado com sucesso.' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }
}
