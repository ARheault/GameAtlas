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

router.route("/delete").post(async (req, res) => {
  // First authentification to make sure the client should be allowed to delete this account.
  const aGame = await Game.find({ gameName: req.body.name });
  if (aGame.length) {
    // query for user to delete
    const query = { gameName: req.body.name };

    Game.deleteOne(query, (err, result) => {
      if (err) {
        res.send(
          `Error when attempting to delete user: ${req.body.name}\nError: ${err}`
        );
      } else {
        res.status(200).json({ success: true, userDeleted: req.body.name });
      }
    });
  } else {
    console.log("Game does not exist.");
    res.status(406).json({ authenticated: false, reason: "Game not found" });
  }
});

router.route("/findGame").post(async (req, res) => {
  const aGame = await Game.find({ gameName: req.body.name });
  if (aGame.length) {
    res.status(200).json({ suceess: true, game: aGame[0] });
  } else {
    res.status(400).json({ success: false, reason: "Game not found" });
  }
});

router.route("/findGame:id").get(async (req, res) => {
  const aGame = await Game.find({ gameName: req.params.id });
  if (aGame.length) {
    res.status(200).json({ suceess: true, game: aGame[0] });
  } else {
    res.status(400).json({ success: false, reason: "Game not found" });
  }
});

router.route("/edit").post((req, res) => {
  console.log("Edit a game based on request.");
});

router.route("/addAuthor").post((req, res) => {
  console.log("Add an author to a game");
});

module.exports = router;
