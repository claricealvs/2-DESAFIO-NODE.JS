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

  // Adicione outros métodos de serviço conforme necessário
}
