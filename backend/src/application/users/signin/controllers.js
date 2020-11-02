"use strict";
const service = require("./services");

module.exports = {
  loginUser: async (request, h) => {
    const user = await service.login({ ...request.payload });
    return user;
  },
};
