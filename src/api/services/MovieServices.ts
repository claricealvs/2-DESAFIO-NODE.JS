import { Repository } from 'typeorm';
import connect from '../../database/connection';
import { Movie } from '../../database/entities/Movie';
import { Ticket } from '../../database/entities/Ticket';

export class MovieService {
  private movieRepository!: Repository<Movie>;

  constructor() {
    this.initializeRepository();
  }

  private async initializeRepository() {
    const connection = await connect();
    this.movieRepository = connection.getRepository(Movie);
  }

  async getAllMovies() {
    try {
      return await this.movieRepository.find({
        relations: ['sessions', 'sessions.tickets'],
      });
    } catch (error) {
      if (error instanceof Error) {
        // Aqui você pode acessar as propriedades do erro com segurança
        throw new Error(`Error retrieving movies: ${error.message}`);
      } else {
        // Lide com outros tipos de erros, se necessário
        throw new Error('Unknown error retrieving movies');
      }
    }
  }

  async getMovieById(id: number): Promise<Movie | null> {
    try {
      const movie = await this.movieRepository.findOne({
        where: { id },
        relations: ['sessions', 'sessions.tickets'],
      });
      return movie ? movie : null;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error retrieving movie with ID ${id}: ${error.message}`,
        );
      } else {
        throw new Error('Unknown error retrieving movie');
      }
    }
  }

  async createMovie(
    name: string,
    description: string,
    actors: string[],
    genre: string,
    release_date: string,
    image: string,
  ): Promise<Movie> {
    const existingMovie = await this.movieRepository.findOne({
      where: { name },
    });

    // Filme já existe
    if (existingMovie) {
      throw new Error('Filme já cadastrado.');
    }

    // Limite de caracteres para descrição
    const MAX_DESCRIPTION_LENGTH = 100;

    if (description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `A descrição do filme não pode exceder ${MAX_DESCRIPTION_LENGTH} caracteres.`,
      );
    }

    // Converter release_date para Date
    const releaseDate = new Date(release_date);
    // Verificar se a data é válida
    if (isNaN(releaseDate.getTime())) {
      throw new Error(
        'Data de lançamento inválida. Certifique-se de que a data está no formato correto.',
      );
    }

    // converte os atores para string para poder armazenar no banco
    const actorsString = actors.join(',');
    // Cria filme
    const newMovie = this.movieRepository.create({
      name,
      description,
      actors: actorsString, // atores como string
      genre,
      release_date: releaseDate,
    });

    // Salvar no banco de dados
    await this.movieRepository.save(newMovie);

    return newMovie;
  }

  async updateMovie(
    id: number,
    name: string,
    description: string,
    actors: string[],
    genre: string,
    release_date: string,
  ) {
    // Verifica se o filme a ser alterado existe
    const existingMovie = await this.movieRepository.findOne({ where: { id } });

    if (!existingMovie) {
      throw new Error('Não foi possível encontrar filme para alterar.');
    }

    // Verifica se já tem outro filme com o mesmo nome
    const anotherMovieWithSameName = await this.movieRepository.findOne({
      where: { name },
    });

    if (anotherMovieWithSameName && anotherMovieWithSameName.id !== id) {
      throw new Error('Existe outro filme com esse nome!!!.');
    }

    // Limite de 100 chars para descrição
    const MAX_DESCRIPTION_LENGTH = 100;
    if (description.length > MAX_DESCRIPTION_LENGTH) {
      throw new Error(
        `A descrição do filme não pode exceder ${MAX_DESCRIPTION_LENGTH} caracteres.`,
      );
    }

    // Formata a data de lançamento
    const releaseDate = new Date(release_date);
    if (isNaN(releaseDate.getTime())) {
      throw new Error(
        'Data de lançamento inválida. Certifique-se de que a data está no formato correto.',
      );
    }

    // Converte a lista de atores para string
    const actorsString = actors.join(',');

    // Atualizar o filme existente
    await this.movieRepository.update(id, {
      name,
      description,
      actors: actorsString,
      genre,
      release_date: releaseDate,
    });

    // Buscar o filme atualizado
    const updatedMovie = await this.movieRepository.findOne({ where: { id } });

    if (!updatedMovie) {
      throw new Error('Erro ao atualizar o filme.');
    }

    return updatedMovie;
  }

  async deleteMovie(id: number) {
    await this.movieRepository.delete(id);
  }
}
