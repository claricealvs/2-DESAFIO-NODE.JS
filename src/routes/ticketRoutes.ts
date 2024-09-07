// src/routes/ticketRoutes.ts
import { Router } from 'express';
import { TicketController } from '../api/controllers/TicketController';

const router = Router();
const ticketController = new TicketController();

router.post(
  '/movies/:movie_id/sessions/:session_id/tickets',
  ticketController.createTicket.bind(ticketController),
);

router.put(
  '/movies/:movie_id/sessions/:session_id/tickets/:id',
  ticketController.updateTicket.bind(ticketController),
);

router.delete(
  '/movies/:movie_id/sessions/:session_id/tickets/:id',
  ticketController.deleteTicket.bind(ticketController),
);

export default router;
