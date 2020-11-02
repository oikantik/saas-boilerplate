"use strict";

const Boom = require("@hapi/boom");
const authKeycloak = require("hapi-auth-keycloak");

const config = require("../../../config");
const register = async (server, options) => {
  await server.register({ plugin: authKeycloak });

  server.auth.strategy("keycloak-jwt", "keycloak-jwt", {
    realmUrl: config("/auth/realm"),
    clientId: config("/auth/userClientId"),
    minTimeBetweenJwksRequests: 15,
    cache: true,
    userInfo: ["name", "email", "email_verified"],
  });
};

module.exports = {
  name: "auth",
  register,
};
