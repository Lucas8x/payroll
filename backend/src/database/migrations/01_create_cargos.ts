import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('cargos', (table) => {
    table.increments('id').primary();
    table.string('nome').notNullable().unique();
    table.string('desc');
    table.float('salario_minimo').notNullable();
    table.float('salario_maximo');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('cargos');
}
