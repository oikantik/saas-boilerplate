"use strict";
const OidcApiAdmin = require("../../../lib/oidc-api-admin");
const TransactionalEmailService = require("../../../lib/sendgrid");
const User = require("../User");

module.exports = {
  create: async (data) => {
    try {
      const response = await OidcApiAdmin.create(data);
      const user = await User.query().insertAndFetch(response);
      await TransactionalEmailService.send();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  },
};
