import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('relatorios', table => {
    table.increments('id').primary();
    table.integer('autor_id')
      .notNullable()
      .references('id')
      .inTable('funcionarios');
    table.string('assunto');
    table.text('texto');
    table.dateTime('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('relatorios');
}
