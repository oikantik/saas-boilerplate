"use strict";

const OidcApiClient = require("../../../lib/oidc-api-client");

module.exports = {
  login: async (data) => {
    try {
      const user = await OidcApiClient.login(data);
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
};
