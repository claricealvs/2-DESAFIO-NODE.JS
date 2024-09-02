// src/routes/movieRoutes.ts
import { Router } from 'express';
import { MovieController } from '../api/controllers/MovieController';

const router = Router();
const movieController = new MovieController();

// Rota para obter todos os filmes
router.get('/movies', movieController.getAllMovies.bind(movieController));
router.get('/movies/:id', movieController.getMovieByid.bind(movieController));
export default router;
