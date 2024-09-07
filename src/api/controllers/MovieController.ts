// src/controllers/MovieController.ts
import { Request, Response } from 'express';
import { MovieService } from '../services/MovieServices';
import { format } from 'date-fns';
import { pt as ptBR } from 'date-fns/locale';

export class MovieController {
  private movieService = new MovieService();

  async getAllMovies(req: Request, res: Response) {
    try {
      const movies = await this.movieService.getAllMovies();

      const formattedMovies = movies.map((movie) => ({
        id: movie.id,
        name: movie.name,
        description: movie.description,
        actors: movie.actors.split(','), // Array de atores
        genre: movie.genre,
        release_date: format(movie.release_date, 'dd/MM/yyyy HH:mm:ss', {
          locale: ptBR,
        }),
        sessions: movie.sessions.map((session) => ({
          id: session.id,
          movie_id: session.movie_id, // ID do filme
          room: session.room,
          capacity: session.capacity,
          day: session.day,
          time: session.time,
          tickets: session.tickets.map((ticket) => ({
            id: ticket.id,
            chair: ticket.chair,
            value: ticket.value,
          })),
        })),
      }));

      res.json(formattedMovies);
    } catch (error) {
      if (error instanceof Error) {
        res.status(500).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Unknown error occurred' });
      }
    }
  }

  async getMovieById(req: Request, res: Response): Promise<Response> {
    const id = req.params.id;

    try {
      const movie = await this.movieService.getMovieById(parseInt(id, 10));

      //  Filme não foi encontrado
      if (!movie) {
        return res.status(404).json({ error: 'Filme não encontrado.' });
      }

      // Formatação da data de lançamento
      const formattedReleaseDate =
        movie.release_date instanceof Date
          ? format(movie.release_date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
          : null;

      // Ordena os campos do filmes conforme o desejado
      return res.status(200).json({
        id: movie.id,
        name: movie.name,
        description: movie.description,
        actors: movie.actors.split(','), // Atores como array
        genre: movie.genre,
        release_date: formattedReleaseDate, // Data formatada
        sessions: movie.sessions.map((session) => ({
          id: session.id,
          movie_id: session.movie_id, // ID do filme na seção
          room: session.room,
          capacity: session.capacity,
          day: session.day,
          time: session.time,
          tickets: session.tickets.map((ticket) => ({
            id: ticket.id,
            chair: ticket.chair,
            value: ticket.value,
          })),
        })),
      });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }

  async createMovie(req: Request, res: Response) {
    try {
      const { name, description, actors, genre, release_date, image } =
        req.body;

      if (
        !Array.isArray(actors) ||
        actors.some((actor) => typeof actor !== 'string')
      ) {
        return res
          .status(400)
          .json({ error: 'A lista de atores deve ser um array de strings.' }); // Formato da lista de atores
      }

      const newMovie = await this.movieService.createMovie(
        name,
        description,
        actors,
        genre,
        release_date,
        image,
      );

      const formatedMovie = {
        name: newMovie.name,
        description: newMovie.description,
        actors: newMovie.actors.split(','),
        genre: newMovie.genre,
        release_date: newMovie.release_date,
      };
      return res.status(201).json(formatedMovie);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }

  async editMovie(req: Request, res: Response) {
    try {
      const { name, description, actors, genre, release_date } = req.body;

      const id = req.params.id;

      if (
        !Array.isArray(actors) ||
        actors.some((actor) => typeof actor !== 'string')
      ) {
        return res
          .status(400)
          .json({ error: 'A lista de atores deve ser um array de strings.' });
      }

      const newMovie = await this.movieService.updateMovie(
        parseInt(id, 10),
        name,
        description,
        actors,
        genre,
        release_date,
      );

      const formatedMovie = {
        name: newMovie.name,
        description: newMovie.description,
        actors: newMovie.actors.split(','),
        genre: newMovie.genre,
        release_date: newMovie.release_date,
      };
      return res.status(201).json(formatedMovie);
    } catch (error: unknown) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      } else {
        return res.status(500).json({ error: 'Ocorreu um erro inesperado.' });
      }
    }
  }

  async deleteMovie(req: Request, res: Response) {
    const id = req.params.id;

    const movie = await this.movieService.getMovieById(parseInt(id, 10));

    if (!movie) {
      res.status(404).json({ message: 'Filme não encontrado' });
    } else if (movie && movie.sessions && movie.sessions.length > 0) {
      return res.status(400).json({
        message:
          'O filme possui sessões cadastradas, remova as sessões antes de excluir o filme',
      });
    } else {
      await this.movieService.deleteMovie(movie.id);
      res.status(400);
    }
  }
}
