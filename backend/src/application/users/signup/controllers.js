"use strict";
const service = require("./services");

module.exports = {
  registerUser: async (request, h) => {
    const user = await service.create({ ...request.payload });
    return user;
  },
};
