// src/controllers/SessionController.ts
import { Request, Response } from 'express';
import { SessionService } from '../services/SessionServices';

export class SessionController {
  private sessionService = new SessionService();

  async getAllSessions(req: Request, res: Response) {
    try {
      const sessions = await this.sessionService.getAllSessions();

      const formattedSessions = sessions.map((session) => ({
        id: session.id,
        room: session.room,
        capacity: session.capacity,
        day: session.day,
        time: session.time,
        tickets: session.tickets.map((ticket) => ({
          id: ticket.id,
          chair: ticket.chair,
          value: ticket.value,
        })),
      }));

      res.json(formattedSessions);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  async createSession(req: Request, res: Response) {
    try {
      const movie_id = req.params.movie_id;
      const { room, capacity, day, time } = req.body;

      const newSession = await this.sessionService.createSession(
        parseInt(movie_id, 10),
        room,
        capacity,
        day,
        time,
      );

      const formattedSession = {
        id: newSession.id,
        movie_id: newSession.movie_id,
        room: newSession.room,
        capacity: newSession.capacity,
        day: newSession.day,
        time: newSession.time,
      };

      return res.status(201).json(formattedSession);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }

  async editSession(req: Request, res: Response) {
    try {
      const { room, capacity, day, time } = req.body;

      const movie_id = req.params.movie_id;
      const id = req.params.id;

      const newSession = await this.sessionService.updateSession(
        parseInt(movie_id, 10),
        parseInt(id, 10),
        room,
        capacity,
        day,
        time,
      );

      return res.status(201).json(newSession);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }

  async deleteSession(req: Request, res: Response) {
    try {
      const id = req.params.id;

      await this.sessionService.deleteSession(id);

      return res.status(204).json();
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }
}
