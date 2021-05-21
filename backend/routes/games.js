const router = require("express").Router();
const Game = require("../models/location.model")

// Default route returns all users
router.route("/").get((req, res) => {
    Game.find()
      .then((games) => res.json(games))
      .catch((err) => res.status(400).send(`Error: ${err}`));
  });