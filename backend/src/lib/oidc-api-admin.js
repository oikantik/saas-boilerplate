"use strict";

const KcAdminClient = require("keycloak-admin").default;
const Boom = require("@hapi/boom");
const config = require("../../config");
class OidcApiAdmin {
  constructor() {
    this.kcAdminClient = new KcAdminClient({
      baseUrl: config("/auth/domain"),
    });
  }

  async makeAuthenticatedRequest() {
    try {
      return await this.kcAdminClient.auth({
        grantType: "client_credentials",
        clientId: config("/auth/adminClientId"),
        clientSecret: config("/auth/adminClientSecret"),
      });
    } catch (error) {
      return Boom.badRequest(error.response.data.errorMessage);
    }
  }

  async create(data) {
    try {
      await this.makeAuthenticatedRequest();
      const { first_name, last_name, email, password } = data;
      const response = await this.kcAdminClient.users.create({
        email: email,
        firstName: first_name,
        lastName: last_name,
        enabled: true,
        emailVerified: false,
        credentials: [
          {
            value: password,
            type: "password",
            temporary: false,
          },
        ],
      });

      return {
        first_name,
        last_name,
        email,
        id: response.id,
      };
    } catch (error) {
      return Boom.badRequest(error.response.data.errorMessage);
    }
  }
}

module.exports = new OidcApiAdmin();
