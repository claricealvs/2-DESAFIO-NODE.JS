// src/routes/sessionRoutes.ts
import { Router } from 'express';

import { SessionController } from '../api/controllers/SessionController';

const router = Router();
const sessionController = new SessionController();

//rota get para teste
router.get(
  '/sessions',
  sessionController.getAllSessions.bind(sessionController),
);

//rota post para teste
//movies/:movie_id/sessions
router.post(
  '/session',
  sessionController.createSession.bind(sessionController),
);

//rota put para teste
router.put(
  '/putSession',
  sessionController.createSession.bind(sessionController),
);

/*

router.put('/movies/:movie_id/sessions/:id , sessionController.putSession.bind(sessionController));
router.delete('/movies/:movie_id/sessions', sessionController.deleteSession.bind(sessionController));

*/

export default router;
