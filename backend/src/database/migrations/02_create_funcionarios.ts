import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('funcionarios', (table) => {
    table.increments('id').primary();
    table.boolean('active').defaultTo(true);
    table.string('avatar');
    table.string('nome').notNullable();
    table.string('cpf').notNullable().unique();
    table.string('telefone');
    table.string('data_nascimento').notNullable();
    table.string('rg').notNullable();
    table.string('estado_civil');
    table.string('tipo_sanguineo');
    table.integer('cargo_id').notNullable().references('id').inTable('cargos');
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('funcionarios');
}
