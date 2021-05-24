const router = require("express").Router();
const Location = require("../models/location.model");

// Default route returns all users
router.route("/").get((req, res) => {
  Location.find()
    .then((locations) => res.json(locations))
    .catch((err) => res.status(400).send(`Error: ${err}`));
});

router.route("/add").post((req, res) => {
  console.log("add route for locations");
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
  console.log("add a game to a location based on request.")
});

router.route("/deleteGame").post((req, res) => {
  console.log("Delete a game based on request.");
});

router.route("/addAuthor").post((req, res) => {
  console.log("Add an author to a location");
});

module.exports = router;
