import { Request, Response } from 'express';
import { TicketService } from '../services/TicketServices';

export class TicketController {
  private ticketService = new TicketService();

  async createTicket(req: Request, res: Response) {
    try {
      const { chair, value } = req.body;
      const movie_id = parseInt(req.params.movie);
      const session_id = parseInt(req.params.session_id);

      /* verifica se a sessão existe */
      const verifySession = await this.ticketService.verifySession(session_id);
      if (!verifySession) {
        res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'A sessão não existe.',
        });
      }

      /* verifica se sessão está lotada */
      const verifyFullSession =
        await this.ticketService.sessionFull(session_id);

      if (verifyFullSession) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'A sessão está lotada.',
        });
      }

      /* verifica se o filme existe */
      const verifyMovie = await this.ticketService.verifyMovie(movie_id);
      if (!verifyMovie) {
        res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'O filme não existe.',
        });
      }

      /* verifica se a cadeira ja esta usada */
      const disponibleChair = await this.ticketService.disponibleChair(chair);

      if (disponibleChair) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'A cadeira ' + chair + ' já está ocupada',
        });
      }

      /* verifica se a quantidade de assentos ja esta excedida */

      const ticket = await this.ticketService.createTicket(
        movie_id,
        session_id,
        chair,
        value,
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
      const movie_id = parseInt(req.params.movie_id);
      const session_id = parseInt(req.params.session_id);

      const id = req.params.id;

      /* verifica se sessão está lotada */
      const verifyFullSession =
        await this.ticketService.sessionFull(session_id);

      if (verifyFullSession) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'A sessão está lotada.',
        });
      }

      /* verifica se a sessão existe */
      const verifySession = await this.ticketService.verifySession(session_id);
      if (!verifySession) {
        res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'A sessão não existe.',
        });
      }

      /* verifica se a cadeira ja esta usada */
      const disponibleChair = await this.ticketService.disponibleChair(chair);

      if (disponibleChair) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: 'A cadeira ' + chair + ' já está ocupada',
        });
      }

      const ticket = await this.ticketService.updateTicket(
        id,
        movie_id,
        session_id,
        chair,
        value,
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
        return res.status(404).json({
          code: 404,
          status: 'Not Found',
          message: 'Ingresso não encontrado',
        });
      }

      await this.ticketService.deleteTicket(id);

      return res.status(200).json({ message: 'status code 200' });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({
          code: 400,
          status: 'Bad Request',
          message: error.message,
        });
      } else {
        return res.status(500).json({
          code: 500,
          status: 'Internal Server Error',
          message: 'Ocorreu um erro inesperado.',
        });
      }
    }
  }
}
