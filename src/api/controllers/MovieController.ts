// src/controllers/MovieController.ts
import { Request, Response } from 'express';
import { MovieService } from '../services/MovieServices';

export class MovieController {
  private movieService = new MovieService();

  async getAllMovies(req: Request, res: Response) {
    try {
      const movies = await this.movieService.getAllMovies();
      res.json(movies);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }
}
