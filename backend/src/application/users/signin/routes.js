"use strict";

const Joi = require("@hapi/joi");

const controllers = require("./controllers");

const LoginRoutes = {
  name: "User login Routes",
  register: (server, options) => {
    server.route([
      {
        method: "POST",
        path: "/login",
        handler: controllers.loginUser,
      },
    ]);
  },
};

module.exports = LoginRoutes;
