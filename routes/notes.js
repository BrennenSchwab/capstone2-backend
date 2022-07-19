"use strict";


const express = require("express");
const router = express.Router();
const jsonschema = require("jsonschema");

const { BadRequestError } = require("../expressError");

const { ensureLoggedIn } = require("../middleware/auth");
const Notes = require("../models/notes");
const notesUpdateSchema = require("../schemas/notesUpdate.json");

router.put("/:noteId", ensureLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, notesUpdateSchema);
    if (!validator.valid){
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const note = await Notes.update(req.params.id, req.body);
    return res.json({ note });
  }catch (err){
    return next(err);
  }
  //access note
  //change content
});
module.exports = router;