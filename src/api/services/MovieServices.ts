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
  ): Promise<Movie> {
    const existingMovie = await this.movieRepository.findOne({
      where: { name },
    });

    if ([name, description, actors, genre, release_date].some((value) => typeof value === null || value === undefined || value === '',)) {
      throw new Error('Todos os campos são requeridos. {name, description, actors, genre, release_date}');
    }

    // Filme já existe
    if (existingMovie) {
      throw new Error('Filme já cadastrado.');
    }

    if (typeof name !== "string"){
      throw new Error('Campo {name} deve ser uma string');
    }

    // Limite de caracteres para descrição
    const MAX_DESCRIPTION_LENGTH = 100;

    if (description.length > MAX_DESCRIPTION_LENGTH || typeof description !== "string") {
      throw new Error(
        `A descrição do filme deve ser uma 'string' e não pode exceder ${MAX_DESCRIPTION_LENGTH} caracteres.`,
      );
    }
    
    if (!Array.isArray(actors) ||actors.some((actor) => typeof actor !== 'string')){
      throw new Error('Campo {actors} deve ser uma lista de strings')
    }

    if (typeof genre !== "string"){
      throw new Error('Campo {genre} deve ser uma string');
    }

    const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    console.log(release_date)
    if(!regexDate.test(release_date)){
      throw new Error('Campo {release_date} deve ter o formato: dd/mm/yyy')
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

    if ([name, description, actors, genre, release_date].some((value) => typeof value === null || value === undefined || value === '',)) {
      throw new Error('Todos os campos são requeridos. {name, description, actors, genre, release_date}');
    }

    if (typeof name !== "string"){
      throw new Error('Campo {name} deve ser uma string');
    }

    // Limite de caracteres para descrição
    const MAX_DESCRIPTION_LENGTH = 100;

    if (description.length > MAX_DESCRIPTION_LENGTH || typeof description !== "string") {
      throw new Error(
        `A descrição do filme deve ser uma 'string' e não pode exceder ${MAX_DESCRIPTION_LENGTH} caracteres.`,
      );
    }
    
    if (!Array.isArray(actors) ||actors.some((actor) => typeof actor !== 'string')){
      throw new Error('Campo {actors} deve ser uma lista de strings')
    }

    if (typeof genre !== "string"){
      throw new Error('Campo {genre} deve ser uma string');
    }

    const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

    console.log(release_date)
    if(!regexDate.test(release_date)){
      throw new Error('Campo {release_date} deve ter o formato: dd/mm/yyy')
    }
    // Converter release_date para Date
    const releaseDate = new Date(release_date);
    // Verificar se a data é válida
    if (isNaN(releaseDate.getTime())) {
      throw new Error(
        'Data de lançamento inválida. Certifique-se de que a data está no formato correto.',
      );
    }
    
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
