
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('student').del()
    .then(function () {
      // Inserts seed entries
      return knex('student').insert([
        {id: 1, name : "admin", email : "admin@mail.com", phone : "555-555-555"},
        {id: 2, name : "guest", email : "guest@mail.com", phone : "888-888-888"},
      ]);
    });
};
