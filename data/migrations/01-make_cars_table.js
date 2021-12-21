exports.up = function (knex) {
  return knex.schema.createTable("Cars", tbl => {
    tbl.increments();
    tbl.text("VIN", 17).unique().notNullable()
    tbl.text("Make", 64).notNullable()
    tbl.text("Model", 64).notNullable()
    tbl.integer("Mileage").notNullable()
    tbl.text("Title", 64)
    tbl.text("Transmission", 64)
  })
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("Cars")
};
