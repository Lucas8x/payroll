import Knex from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable('accounts', table => {
    table.increments('id').primary();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.integer('type').notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable('accounts');
}
