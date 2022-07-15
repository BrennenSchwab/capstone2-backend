const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../middleware/auth");
const Notes = require("../models/notes");
const Widget = require("../models/widget");

router.get("/", ensureLoggedIn, (req, res) => {
  const userId = res.locals.user;
});

router.post("/note", ensureLoggedIn, async (req, res) => {
  const { content, x, y } = req.body;
  const userId = res.locals.user;
  const note = await Notes.create({ content });
  const widget = await Widget.create({
    x,
    y,
    userId,
    contentType: "notes",
    contentId: note.id,
  });

  return {
    id: widget.id,
    userId,
    x,
    y,
    contentType: "notes",
    contentId: note.id,
    content,
  };
});

router.put("/:widgetId", ensureLoggedIn, async (req, res) => {
  const { x, y } = req.boy;
  //access widet
  //see what changed and change it
});

router.delete("/");
