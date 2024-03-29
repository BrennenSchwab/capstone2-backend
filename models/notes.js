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

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE notes 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                notesData`;
    const result = await db.query(querySql, [...values, id]);
    const note = result.rows[0];

    if (!note) throw new NotFoundError(`No note: ${id}`);

    return note;
  }
}

module.exports = Notes;
