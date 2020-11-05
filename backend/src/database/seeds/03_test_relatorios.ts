import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('relatorios').insert([
    {
      autor_id: 1,
      assunto: 'Resolução da questão',
      texto: 'Você deve conseguir 1 balde',
    },
  ]);
}
