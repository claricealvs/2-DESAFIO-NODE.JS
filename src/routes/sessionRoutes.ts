// src/routes/sessionRoutes.ts
import { Router } from 'express';

import { SessionController } from '../api/controllers/SessionController';

const router = Router();
const sessionController = new SessionController();

//rota put para editar session
router.put(
  '/movies/:movie_id/sessions/:id',
  sessionController.editSession.bind(sessionController),
);

router.delete(
  '/movies/:movie_id/sessions/:id',
  sessionController.deleteSession.bind(sessionController),
);

//rota get para listar todas as sessions
router.get(
  '/sessions',
  sessionController.getAllSessions.bind(sessionController),
);

//rota post para criar session
router.post(
  '/movies/:movie_id/sessions',
  sessionController.createSession.bind(sessionController),
);

export default router;
