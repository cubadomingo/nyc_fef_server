exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table){
    table.increments();
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.string('datetime').notNullable();
    table.integer('location').notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
