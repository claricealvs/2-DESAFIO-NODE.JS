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
        //movie_id: session.movie_id
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
      const { room, capacity, day, time } = req.body;

      const newSession = await this.sessionService.createSession(
        room,
        capacity,
        day,
        time,
      );

      const formatedSession = {
        room: newSession.room,
        capacity: newSession.capacity,
        day: newSession.day,
        time: newSession.time,
      };
      return res.status(201).json(formatedSession);
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

      const id = req.params.id;

      const newSession = await this.sessionService.updateSession(
        parseInt(id, 10),
        room,
        capacity,
        day,
        time,
      );

      const formatedSession = {
        room: newSession.room,
        capacity: newSession.capacity,
        day: newSession.day,
        time: newSession.time,
      };
      return res.status(201).json(formatedSession);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }
}
