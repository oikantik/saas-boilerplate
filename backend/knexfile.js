const config = require("./config");

module.exports = {
  client: "pg",

  connection: config("/db/connection"),
  seeds: {
    directory: config("/db/seedDirectory"),
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: "knex_migrations",
  },
};
