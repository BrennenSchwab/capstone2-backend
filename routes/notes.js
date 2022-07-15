const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../middleware/auth");
const Notes = require("../models/notes");

router.put("/:noteId", ensureLoggedIn, async (req, res) => {
  const { content } = req.boy;
  //access note
  //change content
});
