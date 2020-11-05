import { Request, Response } from 'express';
import db from '../database/connection';

export default class DashboardController {
  async index(req: Request, res: Response) {
    const totalFuncionarios = await db('funcionarios')
      .count('id', { as: 'total' })
      .first();

    const funcionariosAtivos = await db('funcionarios')
      .count('active', { as: 'total' })
      .where('active', true)
      .first();

    return res.json({
      total_funcionarios: totalFuncionarios?.total || null,
      funcionarios_ativos: funcionariosAtivos?.total || null,
    });
  }
}
