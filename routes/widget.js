"use strict";


const express = require("express");
const router = express.Router();
const jsonschema = require("jsonschema");
const { ensureLoggedIn } = require("../middleware/auth");
const Notes = require("../models/notes");
const Widget = require("../models/widget");
const widgetNewSchema = require("../schemas/widgetNew.json");
const widgetUpdateSchema = require("../schemas/widgetUpdate.json");



router.post("/note", ensureLoggedIn, async (req, res) => {
  const { content, x, y, width, height } = req.body; //validator?
  const userId = res.locals.user;
  const note = await Notes.create({ content });
  const widget = await Widget.create({
    x,
    y,
    width,
    height, 
    userId,
    contentType: "notes",
    contentId: note.id,
  });

  return {
    id: widget.id,
    userId,
    x,
    y,
    width,
    height,
    contentType: "notes",
    contentId: note.id,
    content,
  };
});

router.put("/:widgetId", ensureLoggedIn, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, widgetUpdateSchema);
    if (!validator.valid){
      const errs = validator.errors.map(e => e.stack);
      throw new BadRequestError(errs);
    }
    const widget = await Widget.update(req.params.id, req.body);
    return res.json({ widget });
  }catch (err){
    return next(err);
  }

  //access widet
  //see what changed and change it
});

router.delete("/");

module.exports = router;