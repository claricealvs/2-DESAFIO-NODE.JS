import { AppDataSource } from '../../database/data-source';
import { Movie } from '../../database/entities/Movie';

export class MovieService {
  private movieRepository = AppDataSource.getRepository(Movie);

  async getAllMovies() {
    try {
      return await this.movieRepository.find();
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
      const movie = await this.movieRepository.findOne({ where: { id } });
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
    // Verificar se o filme já existe
    const existingMovie = await this.movieRepository.findOne({
      where: { name },
    });

    if (existingMovie) {
      throw new Error('Filme já cadastrado.');
    }

    // Definir limite de caracteres para a descrição
    const MAX_DESCRIPTION_LENGTH = 100;
    // Validar descrição
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

    const actorsString = actors.join(',');
    console.log(actors);
    // Criar novo filme
    const newMovie = this.movieRepository.create({
      name,
      description,
      actors: actorsString, // Isso deve ser um array de strings
      genre,
      release_date: releaseDate,
      image,
    });

    // Salvar no banco de dados
    await this.movieRepository.save(newMovie);

    return newMovie;
  }
}
// Adicione outros métodos de serviço conforme necessário
