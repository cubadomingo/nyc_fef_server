exports.up = function(knex, Promise) {
  return knex.schema.createTable('events', function(table){
    table.increments();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.dateTime('datetime').notNullable();
    table.string('location').notNullable();
    table.timestamps(false, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('events');
};
