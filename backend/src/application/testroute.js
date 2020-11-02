"use strict";

const TestRoute = {
  name: "testing routes",
  register: async (server, options) => {
    server.route([
      {
        method: "GET",
        path: "/test",
        handler: (request, h) => {
          console.log(request.auth.credentials);
          return "Hello";
        },
        options: {
          auth: {
            strategies: ["keycloak-jwt"],
          },
        },
      },
    ]);
  },
};

module.exports = TestRoute;
