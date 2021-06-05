const router = require("express").Router();
const Location = require("../models/location.model");

// Default route returns all users
router.route("/").get((req, res) => {
  Location.find()
    .then((locations) => res.json(locations))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

router.route("/add").post(async (req, res) => {
  // First make sure the location isn't attempting to add a location with a duplicate name
  const aLocation = await Location.find({ name: req.body.name });
  if (aLocation.length > 0) {
    console.log("Location already exists.");
    return res
      .status(406)
      .json({ success: false, reason: "Location already exists" });
  }
  const locationName = req.body.name;
  const locationAddress = req.body.address;
  const creator = req.body.creator;

  const newLocation = new Location({
    name: locationName,
    address: locationAddress,
    creators: creator,
    dateCreated: Date.now(),
  });
  newLocation
    .save()
    .then(() => console.log(`Location: ${req.body.name} added.`))
    .then(() => res.status(200).send(`Location: ${req.body.name} added.`))
    .catch((err) =>
      res.status(400).json({ Error: err, Location: req.body.name })
    );
});

router.route("/delete").post(async (req, res) => {
  // First authentification to make sure the client should be allowed to delete this account.
  const aLocation = await Location.find({ name: req.body.name });
  if (aLocation.length) {
    // query for user to delete
    const query = { name: req.body.name };

    Location.deleteOne(query, (err, result) => {
      if (err) {
        return res.json({ Error: err });
      } else {
        res.status(200).json({ success: true, locationDeleted: req.body.name });
      }
    });
  } else {
    console.log("Location does not exist.");
    res
      .status(406)
      .json({ authenticated: false, reason: "Location not found" });
  }
});

router.route("/findLocation").post(async (req, res) => {
  const aLocation = await Location.find({ name: req.body.name });
  if (aLocation.length) {
    res.status(200).json({ success: true, location: aLocation[0] });
  } else {
    res.status(400).json({ success: false, reason: "Location not found" });
  }
});

router.route("/findLocation:id").get(async (req, res) => {
  const aLocation = await Location.find({ name: req.params.id });
  if (aLocation.length) {
    res.status(200).json({ suceess: true, location: aLocation[0] });
  } else {
    res.status(400).json({ success: false, reason: "Location not found" });
  }
});

router.route("/addGame").post(async (req, res) => {
  const aLocation = await Location.find({ name: req.body.name });

  if (aLocation.length) {
    if (aLocation[0].games.includes(req.body.newGame)) {
      return res.status(400).json({
        success: false,
        reason: `Game ${req.body.newGame} already exists in this location`,
      });
    }
    aLocation[0].games.push(req.body.newGame);
    ++aLocation[0].numGames;
    aLocation[0]
      .save()
      .then(() =>
        console.log(
          `Location ${req.body.name} saved new game ${req.body.newGame}`
        )
      )
      .then(() =>
        res.status(200).json({
          Location: req.body.name,
          gameAdded: req.body.newGame,
        })
      )
      .catch((err) =>
        res.status(400).json({ Error: err, Location: req.body.name })
      );
  }
});

router.route("/deleteGame").post(async (req, res) => {
  const aLocation = await Location.find({ name: req.body.name });

  // Make sure location exists
  if (!aLocation.length) {
    return res
      .status(400)
      .json({ success: false, reason: "Location not found" });
  }
  // Check if game we want to delete is in this location
  if (!aLocation[0].games.includes(req.body.gameToDelete)) {
    return res
      .status(400)
      .json({ success: false, reason: "Game not found in location" });
  }
  // Filter out the game
  aLocation[0].games = aLocation[0].games.filter((game) => {
    if (game !== req.body.gameToDelete) {
      return game;
    }
  });
  --aLocation[0].numGames;
  // If the location still has games
  if (aLocation[0].games.length > 0) {
    aLocation[0]
      .save()
      .then(() =>
        console.log(
          `Location ${req.body.name} deleted game ${req.body.gameToDelete}`
        )
      )
      .then(() =>
        res.status(200).json({
          Location: req.body.name,
          GameDeleted: req.body.gameToDelete,
        })
      )
      .catch((err) =>
        res.status(400).json({ Error: err, Location: req.body.name })
      );
  }

  // Otherwise if it has no games anymore delete the empty location
  else {
    const query = { name: req.body.name };
    console.log(
      `Location ${req.body.name} deleted game ${req.body.gameToDelete}\nLocation had no games left and was deleted`
    );
    Location.deleteOne(query, (err, result) => {
      if (err) {
        res.send(
          `Error when attempting to delete location: ${req.body.name}\nError: ${err}`
        );
      } else {
        res.status(200).json({ success: true, locationDeleted: req.body.name });
      }
    });
  }
});

router.route("/addAuthor").post(async (req, res) => {
  const aLocation = await Location.find({ name: req.body.name });

  if (aLocation.length) {
    if (aLocation[0].games.includes(req.body.newCreator)) {
      return res.status(400).json({
        success: false,
        reason: `Creator ${req.body.newCreator} already exists in this location`,
      });
    }
    aLocation[0].creators.push(req.body.newCreator);
    aLocation[0]
      .save()
      .then(() =>
        console.log(
          `Location ${req.body.name} saved new creator ${req.body.newCreator}`
        )
      )
      .then(() =>
        res.status(200).json({
          Location: req.body.name,
          creatorAdded: req.body.newCreator,
        })
      )
      .catch((err) =>
        res.status(400).json({ Error: err, Location: req.body.name })
      );
  }
});

module.exports = router;
