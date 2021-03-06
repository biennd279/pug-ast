
exports.up = function(knex) {
  return knex.schema
      .createTable("student", function (t) {
          t.increments("id").primary()
          t.string("name").notNullable()
          t.string("email").notNullable()
          t.string("phone").notNullable()
      })
};

exports.down = function(knex) {
  return knex.schema
      .dropTableIfExists("student")
};
