exports.up = async (knex) => {
  await knex.schema.createTable("user", (table) => {
    table.uuid("id").primary();
    table.string("first_name").notNullable();
    table.string("last_name").notNullable();
    table.string("email").notNullable();
    table.boolean("email_verified").notNullable().defaultTo(false);
    table.unique(["id", "email"]);
    table.timestamp("created_at").notNullable();
    table.timestamp("updated_at");
  });
};

exports.down = async (knex) => {
  await knex.schema.dropTable("user");
};
