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
  const aLocation = await Location.find({ username: req.body.username });
  if (aLocation.length > 0) {
    console.log("Location already exists.");
    res.status(406).json({success: false, reason: "Location already exists"});
  } else {
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
  }
});

router.route("/delete").post((req, res) => {
  console.log("delete route for locations");
});

router.route("/findLocation").post((req, res) => {
  console.log("Find a location based on request.");
});

router.route("/findLocation:id").get((req, res) => {
  console.log("Find a location based on ID passed via url");
});

router.route("/addGame").post((req, res) => {
  console.log("add a game to a location based on request.");
});

router.route("/deleteGame").post((req, res) => {
  console.log("Delete a game based on request.");
});

router.route("/addAuthor").post((req, res) => {
  console.log("Add an author to a location");
});

module.exports = router;
