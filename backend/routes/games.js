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
    return res
      .status(406)
      .json({ success: false, reason: "Game already exists" });
  }
  const gameName = req.body.name;
  const minPlayers = req.body.min;
  const maxPlayers = req.body.max;
  const isReocurring = req.body.reocurring;
  const creator = req.body.creator;

  const newGame = new Game({
    gameName: gameName,
    minimumPlayers: minPlayers,
    maximumPlayers: maxPlayers,
    creators: creator,
    reocurring: isReocurring,
    dateCreated: Date.now(),
  });
  newGame
    .save()
    .then(() => console.log(`Game: ${req.body.name} added.`))
    .then(() => res.status(200).json({ success: true }))
    .catch((err) => res.status(400).json({ Error: err, Game: req.body.name }));
});

router.route("/delete").post(async (req, res) => {
  // First authentification to make sure the client should be allowed to delete this account.
  const aGame = await Game.find({ gameName: req.body.name });
  if (aGame.length) {
    if (!aGame[0].creators.includes(req.body.clientName)) {
      return res.status(400).json({
        success: false,
        reason: `client is requesting to delete game they do not have access to`,
      });
    }
    // query for user to delete
    const query = { gameName: req.body.name };

    Game.deleteOne(query, (err, result) => {
      if (err) {
        res.send(
          `Error when attempting to delete game: ${req.body.name}\nError: ${err}`
        );
      } else {
        res.status(200).json({ success: true, gameDeleted: req.body.name });
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
    res.status(200).json({ success: true, game: aGame[0] });
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

router.route("/edit").post(async (req, res) => {
  const query = { gameName: req.body.gameToEdit };
  const aGame = await Game.find({ gameName: req.body.gameToEdit });
  if (!aGame.length) {
    return res.status(400).json({ success: false, reason: "Game not found" });
  }
  if (aGame[0].creators && !aGame[0].creators.includes(req.body.clientName)) {
    return res.status(400).json({
      success: false,
      reason: `client is requesting to edit a game they do not have access to`,
    });
  }

  const gameName = req.body.name;
  const minPlayers = req.body.min;
  const maxPlayers = req.body.max;
  const isReocurring = req.body.reocurring;
  let creator = [];
  aGame[0].creators.forEach((elem) => {
    creator.push(elem);
  });

  const newGame = new Game({
    gameName: gameName,
    minimumPlayers: minPlayers,
    maximumPlayers: maxPlayers,
    creators: creator,
    reocurring: isReocurring,
    dateCreated: Date.now(),
  });
  newGame
    .save()
    .then(() =>
      console.log(`Game: ${req.body.gameToEdit} edited to ${req.body.name}.`)
    )
    .then(() => res.status(200).send(`Game: ${req.body.name} added.`))
    .catch((err) => res.status(400).json({ Error: err, Game: req.body.name }));

  Game.deleteOne(query, (err, result) => {
    if (err) {
      res.send(
        `Error when attempting to delete game: ${req.body.gameToEdit}\nError: ${err}`
      );
    }
  });
});

router.route("/addAuthor").post(async (req, res) => {
  const aGame = await Game.find({ gameName: req.body.name });

  if (!aGame.length) {
    console.log(aGame);
    return res.status(400).json({ success: false, reason: "Game not found" });
  }
  if (!aGame[0].creators.includes(req.body.clientName)) {
    return res.status(400).json({
      success: false,
      reason: `client is requesting to add an author to a game they do not have access to`,
    });
  }

  aGame[0].creators.push(req.body.newCreator);
  aGame[0]
    .save()
    .then(() =>
      console.log(
        `Game ${req.body.name} saved new creator ${req.body.newCreator}`
      )
    )
    .then(() =>
      res.status(200).json({
        Game: req.body.name,
        creatorAdded: req.body.newCreator,
      })
    )
    .catch((err) => res.status(400).json({ Error: err, Game: req.body.name }));
});

module.exports = router;
