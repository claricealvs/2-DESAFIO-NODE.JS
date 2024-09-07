// src/routes/ticketRoutes.ts
import { Router } from 'express';
import { TicketController } from '../api/controllers/TicketController';

const router = Router();
const ticketController = new TicketController();

//rota post para adicionar novo ticket
router.post(
  '/movies/:movie_id/sessions/:session_id/tickets',
  ticketController.createTicket.bind(ticketController),
);

//rota put para atualizar ticket
router.put(
  '/movies/:movie_id/sessions/:session_id/tickets/:id',
  ticketController.updateTicket.bind(ticketController),
);

//rota delete para remover ticket
router.delete(
  '/movies/:movie_id/sessions/:session_id/tickets/:id',
  ticketController.deleteTicket.bind(ticketController),
);

export default router;
