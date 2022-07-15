"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Notes {
  static async create(data) {
    const { content } = data;
    const result = await db.query(
      `INSERT INTO widgets (content)
               VALUES ($1)
               RETURNING id, content`,
      [content]
    );
    //verify
    const note = result.rows[0];
    return note;
  }
}

module.exports = Notes;
