const config = require("../../config");

const options = {
  client: "pg",
  connection: config("/db/connection"),
  // pool: {
  //   min: 2,
  //   max: 10,
  // },
};

module.exports = require("knex")(options);
