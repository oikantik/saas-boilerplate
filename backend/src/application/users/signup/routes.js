"use strict";

const Joi = require("@hapi/joi");

const controllers = require("./controllers");

const SignupRoutes = {
  name: "User Signup Routes",
  register: (server, options) => {
    server.route([
      {
        method: "POST",
        path: "/users",
        handler: controllers.registerUser,
        options: {
          validate: {
            payload: Joi.object({
              first_name: Joi.string().required(),
              last_name: Joi.string().required(),
              email: Joi.string().email().lowercase().required(),
              password: Joi.string().required(),
            }),
          },
        },
      },
    ]);
  },
};

module.exports = SignupRoutes;
