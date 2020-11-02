"use strict";

const Confidence = require("confidence");
const Dotenv = require("dotenv");

Dotenv.config({ silent: true });

const env = process.env.APP_ENV || "development";

const config = {
  $filter: "env",
  $base: {
    env,
    db: {
      connection: {
        host: process.env.POSTGRES_HOST,
        user: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
        port: process.env.POSTGRES_PORT,
        ssl: { rejectUnauthorized: false },
      },
      seedDirectory: process.env.SEED_DIR
        ? process.env.SEED_DIR
        : "./seeds/test",
    },
    auth: {
      userClientId: process.env.OIDC_CLIENT_ID,
      userClientSecret: process.env.OIDC_CLIENT_SECRET,
      adminClientId: process.env.OIDC_ADMIN_ID,
      adminClientSecret: process.env.OIDC_ADMIN_SECRET,
      domain: process.env.OIDC_URL,
      realm: process.env.OIDC_REALM,
    },
    transactional_emails: {
      sendgrid_api: process.env.SENDGRID_API_KEY,
    },
  },
  development: {
    stripe: {
      private_secret: process.env.STRIPE_PRIVATE_SECRET,
    },
  },
  production: {
    stripe: {
      private_secret: process.env.STRIPE_PRIVATE_SECRET,
    },
  },
};

const store = new Confidence.Store();
store.load(config);

module.exports = (path, criteria) => {
  path = path || "/";
  criteria = criteria || {};
  criteria.env = env;

  return store.get(path, criteria);
};
