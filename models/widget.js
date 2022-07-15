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

    static async create(data) {
        const result = await db.query(
              `INSERT INTO widgets (x_y,
                                 content_type)
               VALUES ($1, $2)
               RETURNING id, x_y, content_type, content_id`,
            [
              data.x_y,
              data.content_type,
              data.content_id,
            ]);
        let widget = result.rows[0];
    
        return widget;
      }
}