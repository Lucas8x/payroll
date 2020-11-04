import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('accounts').insert([
    {username: 'adm', password: 'adm', type: 1},
    {username: 'gerente', password: 'gerente', type: 2}
  ]);
}
