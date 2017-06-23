exports.up = function(knex) {
  return knex.schema.createTable('scholarships', function(table){
    table.increments();
    table.string('title').notNullable();
    table.text('description').notNullable();
    table.dateTime('deadline').notNullable();
    table.text('eligibility').notNullable();
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('scholarships');
};
