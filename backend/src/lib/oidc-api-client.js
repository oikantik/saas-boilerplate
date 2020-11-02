"use strict";

const Boom = require("@hapi/boom");
const Wreck = require("@hapi/wreck");
const Querystring = require("querystring");
const config = require("../../config");

class OidcApiClient {
  constructor() {
    this.wreck = Wreck.defaults({
      baseUrl: config("/auth/domain") + "/", // does not work without trailing slash, weird Wreck issue
      json: true,
      headers: { "content-type": "application/x-www-form-urlencoded" },
    });
  }

  async makeAuthenticatedRequest(method, path, options = {}) {
    try {
      const response = await this.wreck[method](path, options);
      return response.payload;
    } catch (error) {
      return Boom.unauthorized(error.output.payload.message);
    }
  }

  async login(payload) {
    try {
      const morePayload = {
        ...payload,
        grant_type: "password",
        client_id: config("/auth/userClientId"),
        client_secret: config("/auth/userClientSecret"),
        scope: "openid",
      };
      const response = await this.makeAuthenticatedRequest(
        "post",
        "realms/master/protocol/openid-connect/token",
        {
          payload: Querystring.stringify(morePayload),
        }
      );
      return response;
    } catch (error) {
      return Boom.badRequest(error.response.data.errorMessage);
    }
  }
}

module.exports = new OidcApiClient();
