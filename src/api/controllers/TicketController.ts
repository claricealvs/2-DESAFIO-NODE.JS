import { Request, Response } from 'express';
import { TicketService } from '../services/TicketServices';

export class TicketController {
  private ticketService = new TicketService();
}
