const router = require("express").Router();
const Game = require("../models/game.model");

// Default route returns all users
router.route("/").get((req, res) => {
  Game.find()
    .then((games) => res.json(games))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

router.route("/add").post(async (req, res) => {
  // First make sure the client isn't attempting to add a game with a duplicate name
  const aGame = await Game.find({ gameName: req.body.name });
  if (aGame.length > 0) {
    console.log("Game already exists.");
    res.status(406).json({ success: false, reason: "Game already exists" });
  } else {
    const gameName = req.body.name;
    const minPlayers = req.body.min;
    const maxPlayers = req.body.max;
    const isReocurring = req.body.reocurring;

    const newGame = new Game({
      gameName: gameName,
      minimumPlayers: minPlayers,
      maximumPlayers: maxPlayers,
      reocurring: isReocurring,
      dateCreated: Date.now(),
    });
    newGame
      .save()
      .then(() => console.log(`Game: ${req.body.name} added.`))
      .then(() => res.status(200).send(`Game: ${req.body.name} added.`))
      .catch((err) =>
        res.status(400).json({ Error: err, Game: req.body.name })
      );
  }
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

router.route("/edit").post((req, res) => {
  console.log("Edit a game based on request.")
});

router.route("/addAuthor").post((req, res) => {
  console.log("Add an author to a game");
});

module.exports = router;
