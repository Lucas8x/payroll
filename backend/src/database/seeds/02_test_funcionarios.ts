import Knex from 'knex';

export async function seed(knex: Knex) {
  await knex('funcionarios').insert([
    {
      active: true,
      nome: 'Lucas',
      cpf: '123.456.789-10',
      telefone: '82991234567',
      data_nascimento: '01/01/2000',
      rg: '1234567-8',
      estado_civil: 'solteiro',
      tipo_sanguineo: 'O+',
      cargo_id: 1
    },
  ]);
}
