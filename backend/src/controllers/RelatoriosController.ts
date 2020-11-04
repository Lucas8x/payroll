import { Request, Response } from 'express';
import db from '../database/connection';

export default class RelatoriosController {
  async index(req: Request, res: Response) {
    const relatorios = await db('relatorios')
      .join('funcionarios', 'relatorios.autor_id', '=', 'funcionarios.id')
      .select([
        'relatorios.id',
        'relatorios.assunto',
        'relatorios.created_at',
        'funcionarios.nome as autor'
      ]);

    return res.json(relatorios);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const relatorio = await db('relatorios')
      .join('funcionarios', 'relatorios.autor_id', '=', 'funcionarios.id')
      .where('relatorios.id', id)
      .select(['relatorios.*', 'funcionarios.nome as autor'])
      .first();

    if (!relatorio) {
      return res.status(400).json({
        error: 'Esse relatorio não existe.'
      });
    }

    return res.json(relatorio);
  }

  async create(req: Request, res: Response) {
    const { autor_id, assunto, texto } = req.body;
    const trx = await db.transaction();
    try {
      await trx('relatorios').insert({ autor_id, assunto, texto });
      await trx.commit();
      return res.status(201).json({
        response: 'Relatorio criado com sucesso.'
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro inesperado ao criar relatorio.'
      });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const relatorio = await db('relatorios')
      .select('id')
      .where('id', id)
      .first();

    if (!relatorio) {
      return res.status(400).json({
        error: 'Esse relatorio não existe.'
      });
    }

    const { autor_id, assunto, texto } = req.body;
    await db('relatorios')
      .where('id', id)
      .update({ autor_id, assunto, texto });

    return res.json({
      response: 'Relatorio modificado com sucesso.'
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;
    const relatorio = await db('relatorios')
      .select('id')
      .where('id', id)
      .first();

    if (!relatorio) {
      return res.status(400).json({
        error: 'Esse relatorio não existe.'
      });
    }

    await db('relatorios')
      .where('id', id)
      .del();

    return res.json({
      response: 'Relatorio deletado com sucesso.'
    });
  }
}
