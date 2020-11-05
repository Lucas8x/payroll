import { Request, Response } from 'express';

import db from '../database/connection';
import funcionarioView from '../views/FuncionarioView';
import { imageDelete } from '../utils/ImageDelete';

export default class FuncionariosController {
  async index(req: Request, res: Response) {
    const cargos = await db('cargos').select('id', 'nome');
    const funcionarios = (
      await db('funcionarios ').select([
        'id',
        'active',
        'avatar',
        'nome',
        'cargo_id',
      ])
    ).map((funcionario) => ({
      ...funcionario,
      cargo: cargos.filter((x) => x.id === funcionario.cargo_id)[0],
    }));

    return res.json(funcionarioView.renderMany(funcionarios));
  }

  async show(req: Request, res: Response) {
    const { id } = req.params;

    const funcionario = await db('funcionarios').where('id', id).first();
    const cargo = await db('cargos').where('id', funcionario.cargo_id).first();

    if (!funcionario) {
      return res.status(400).json({
        response: 'Funcionario não encontrado.',
      });
    }

    return res.json(funcionarioView.render({ ...funcionario, cargo }));
  }

  async create(req: Request, res: Response) {
    const { active, nome, cpf, telefone, data_nascimento, cargo_id } = req.body;
    const avatar = req.file?.filename || null;

    const trx = await db.transaction();

    try {
      await trx('funcionarios').insert({
        active,
        avatar,
        nome,
        cpf,
        telefone,
        data_nascimento,
        cargo_id,
      });
      await trx.commit();
      return res.status(201).json({
        response: 'Funcionario criado com sucesso.',
      });
    } catch (error) {
      await trx.rollback();
      return res.status(400).json({
        error: 'Erro inesperado ao criar funcionario.',
      });
    }
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const funcionario = await db('funcionarios')
      .select('id')
      .where('id', id)
      .first();

    if (!funcionario) {
      return res.status(400).json({
        error: 'Esse funcionario não existe.',
      });
    }

    const { active, nome, cpf, telefone, data_nascimento, cargo_id } = req.body;
    //const avatar = req.file?.filename || null;

    await db('funcionarios').where('id', id).update({
      active,
      nome,
      cpf,
      telefone,
      data_nascimento,
      cargo_id,
    });

    return res.json({
      response: 'Funcionario modificado com sucesso.',
    });
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const funcionario = await db('funcionarios')
      .select()
      .where('id', id)
      .first();

    if (!funcionario) {
      return res.status(400).json({
        error: 'Esse funcionario não existe.',
      });
    }

    if (funcionario.avatar) {
      imageDelete(funcionario.avatar, () => {
        return res.status(500).json({
          response: 'Erro no processo de deletar o funcionario.',
        });
      });
    }

    await db('funcionarios').where('id', id).del();

    return res.json({
      response: 'Funcionario deletado com sucesso.',
    });
  }
}
