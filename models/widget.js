"use strict";

const db = require("../db");
const { sqlForPartialUpdate } = require("../helpers/sql");
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
} = require("../expressError");

class Widget {
  /* Create a widget "area" that will that will load first and parse specific data in after.
   *
   * The widget is refernced to the user_id. Once user widgets are confirmed, a new reference id is
   * used to reference to the correct data table (news, notes, weather...)
   *
   * The widget data should contain {id, user_id, x_y, content_type, content_id}, where x_y are widget dimensions.
   *
   *
   */

  //E.g. create note widget from the note route
  /**
   * - Create note by calling the note model create -> get back id
   * - Call to create widget passing in content_id as note_id
   */

  static async create(data) {
    const { x, y, width, height, userId, contentType, contentId } = data;
    const result = await db.query(
      `INSERT INTO widgets (user_id,x,y, width, height
                                 content_type,content_id)
               VALUES ($1, $2, $3, $4, $5, $6, $7)
               RETURNING id, user_id, x, y, width, height, content_type, content_id`,
      [userId, x, y, width, height, contentType, contentId]
    );
    //verify
    const widget = result.rows[0];
    return widget;
  }

  static async update(id, data) {
    const { setCols, values } = sqlForPartialUpdate(
        data,
        {});
    const idVarIdx = "$" + (values.length + 1);

    const querySql = `UPDATE widgets 
                      SET ${setCols} 
                      WHERE id = ${idVarIdx} 
                      RETURNING id, 
                                user_id, 
                                x, 
                                y, 
                                width, 
                                height, 
                                content_type,
                                content_id`;
    const result = await db.query(querySql, [...values, id]);
    const widget = result.rows[0];

    if (!widget) throw new NotFoundError(`No widget: ${id}`);

    return widget;
  }

  /** Delete widget from database; returns undefined.
   *
   * Throws NotFoundError if widget not found.
   **/

  static async remove(id) {
    const result = await db.query(
          `DELETE
           FROM widgets
           WHERE id = $1
           RETURNING id`, [id]);
    const widget = result.rows[0];

    if (!widget) throw new NotFoundError(`No widget: ${id}`);
  }
}
module.exports = Widget;
