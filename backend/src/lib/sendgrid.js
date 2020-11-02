"use strict";

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs

const Sendgrid = require("@sendgrid/mail");
const config = require("../../config");
Sendgrid.setApiKey(config("/transactional_emails/sendgrid_api"));
const msg = {
  to: "oikantik@gmail.com",
  from: "oikantik@gmail.com", // Use the email address or domain you verified above
  subject: "Sending with Twilio SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};

const TransactionalEmailService = {
  send: async () => {
    try {
      await Sendgrid.send(msg);
    } catch (error) {
      console.error(error);

      if (error.response) {
        console.error(error.response.body);
      }
    }
  },
};

module.exports = TransactionalEmailService;
