"use strict";

const objection = require("objection");
const objectionSoftDelete = require("objection-softdelete");

const knex = require("./src/lib/knex");

const Auth = require("./src/application/auth/auth");
const SignupRoutes = require("./src/application/users/signup/routes");
const LoginRoutes = require("./src/application/users/signin/routes");
const TestRoute = require("./src/application/testroute");

// Register Model knex instance
objection.Model.knex(knex);

// Register objection-softdelete
objectionSoftDelete.register(objection, { deleteAttr: "deleted_at" });

module.exports = {
  server: {
    routes: {
      cors: {
        origin: ["*"],
        additionalHeaders: ["api-version", "x-app-admin-impersonating-user"],
      },
      validate: {
        options: { abortEarly: false },
        failAction: (request, h, error) => {
          if (!error.details) {
            if (error.isBoom) {
              return error;
            }

            return Boom.badImplementation(error);
          }
          error.output.payload.validationErrors = error.details.map(
            (failure) => ({
              message: failure.message,
              type: failure.type,
              key: failure.path,
            })
          );
          return error;
        },
      },
      timeout: { server: 30000 },
    },
    port: 4000,
  },
  register: {
    plugins: [Auth, SignupRoutes, LoginRoutes, TestRoute],
  },
};
