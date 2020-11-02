"use strict";

const { Model } = require("objection");

class User extends Model {
  static get tableName() {
    return "user";
  }

  static get notFoundMessage() {
    return "Invalid user";
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }
}

module.exports = User;
