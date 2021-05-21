const router = require("express").Router();
const Location = require("../models/location.model")

// Default route returns all users
router.route("/").get((req, res) => {
    Location.find()
      .then((locations) => res.json(locations))
      .catch((err) => res.status(400).send(`Error: ${err}`));
  });