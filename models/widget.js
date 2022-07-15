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
     * The widget is refernced to the user, where data is 
    */
}