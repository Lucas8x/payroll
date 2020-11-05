import { Request, Response } from 'express';
import db from '../database/connection';

export default class CargosController {
  async index(req: Request, res: Response) {
    const cargos = await db('cargos').select();
    return res.json(cargos);
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;
    const cargo = await db('cargos').where('id', id).first();

    if (!cargo) {
      return res.status(400).json({
        error: 'Esse cargo não existe.',
      });
    }

    return res.json(cargo);
  }

  async create(req: Request, res: Response) {
    const { nome, desc, salario_minimo, salario_maximo } = req.body;
    const trx = await db.transaction();

    try {
      await trx('cargos').insert({
        nome,
        desc,
        salario_minimo,
        salario_maximo,
      });
      await trx.commit();
      return res.status(201).json({
        response: 'Cargo criado com sucesso.',
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro inesperado ao criar cargo.',
      });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const cargo = await db('cargos').select('id').where('id', id).first();

    if (!cargo) {
      return res.status(400).json({
        error: 'Esse cargo não existe.',
      });
    }

    const { nome, desc, salario_minimo, salario_maximo } = req.body;
    await db('cargos').where('id', id).update({
      nome,
      desc,
      salario_minimo,
      salario_maximo,
    });

    return res.json({
      response: 'Cargo modificado com sucesso.',
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const cargo = await db('cargos').select('id').where('id', id).first();
    if (!cargo) {
      return res.status(400).json({
        error: 'Esse cargo não existe.',
      });
    }

    await db('cargos').where('id', id).del();

    return res.json({
      response: 'Cargo deletado com sucesso.',
    });
  }
}
