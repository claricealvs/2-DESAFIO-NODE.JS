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
        actors: movie.actors.split(','),
        genre: movie.genre,
        release_date: format(movie.release_date, 'dd/MM/yyyy HH:mm:ss', {
          locale: ptBR,
        }), // Formatação da data
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

      // Verifica se o filme foi encontrado
      if (!movie) {
        return res.status(404).json({ error: 'Filme não encontrado.' });
      }

      // Formatar a release_date se for um objeto Date válido
      const formattedReleaseDate =
        movie.release_date instanceof Date
          ? format(movie.release_date, 'dd/MM/yyyy HH:mm:ss', { locale: ptBR })
          : null; // Ou outra lógica de tratamento de erro

      // Retornar o filme com os campos na ordem desejada
      return res.status(200).json({
        id: movie.id,
        name: movie.name,
        description: movie.description,
        actors: movie.actors.split(','), // Mantém como array de strings
        genre: movie.genre,
        release_date: formattedReleaseDate, // Adiciona a data formatada
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
          .json({ error: 'A lista de atores deve ser um array de strings.' });
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
      const { name, description, actors, genre, release_date, image } =
        req.body;

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
}
