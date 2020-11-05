import { Request, Response } from 'express';
import db from '../database/connection';

export default class FolhaDePagamentoController {
  async index(req: Request, res: Response) {
    const {} = req.params;
    return res.json({ ok: true });
  }

  async create(req: Request, res: Response) {
    const {} = req.body;
    return res.json({ ok: true });
  }
}
