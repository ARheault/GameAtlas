const router = require("express").Router();
const Game = require("../models/location.model");

// Default route returns all users
router.route("/").get((req, res) => {
  Game.find()
    .then((games) => res.json(games))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  console.log("add route for games");
});

router.route("/delete").post((req, res) => {
  console.log("delete route for games");
});

router.route("/findGame").post((req, res) => {
  console.log("Find a game based on request.");
});

router.route("/findGame:id").get((req, res) => {
  console.log("Find a game based on ID passed via url");
});

module.exports = router;
