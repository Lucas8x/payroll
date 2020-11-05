import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('cargos').insert([
    {
      nome: 'Engenheiro',
      desc: 'descrição',
      salario_minimo: 8000.5,
      salario_maximo: 15000.1,
    },
  ]);
}
