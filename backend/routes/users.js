const router = require("express").Router();
let User = require("../models/user.model");

// Default route returns all users
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// We could add another json response that indicates where to redirect the user to
/**
 * This is the authentification route that allows for a user to attempt to login
 * @param req.body.username The username of the client who has sent the login request
 * @param req.body.password The password of the account associated with that username
 * @return returns a status indicating success or failure, and two values
 * @authenticated a boolean value, true if the user has successfully logged in, false if not
 * @reason a string value that indicates the reason the user was not able to login, can be used for front end debuggging
 */
router.route("/login").post(async (req, res) => {
  const aUser = await User.find({ username: req.body.username });
  if (aUser.length < 1) {
    console.log("User does not exist.");
    res.status(406).json({ authenticated: false, reason: "User not found" });
  } else {
    if (aUser[0].password === req.body.password) {
      console.log(
        `User: ${req.body.username}\n bad password: ${req.body.password}`
      );
      res.status(200).json({ authenticated: false, reason: "bad password" });
    } else {
      console.log(`User: ${req.body.username} logged in`);
      res.status(200).json({ authenticated: true });
    }
  }
});

/**
 * This route is used to add a user.
 * @param req.body.username Username of the account that the client intends to add
 * @param req.body.password Password of the account that the client intends to add
 * @param req.body.date The date that the account was created that the client intends to add
 * @param req.body.homeLocation This is an optional paramter
 */
router.route("/add").post(async (req, res) => {
  // First make sure the account isn't attempting to add an account wit ha duplicate name
  const aUser = await User.find({ username: req.body.username });
  if (aUser.length > 0) {
    console.log("User already exists.");
    res.status(406).send("User already exists");
  } else {
    const username = req.body.username;
    const password = req.body.password;
    const date = Date.parse(req.body.date);
    let homeLocation = "";

    // Logic to filter for optional field homeLocation
    if (req.body.hasOwnProperty("homeLocation")) {
      homeLocation = req.body.homeLocation;
    }
    if (homeLocation !== "") {
      const newUser = new User({
        username,
        password,
        date,
        homeLocation,
      });
      newUser
        .save()
        .then(() => console.log(`User: ${req.body.username} added.`))
        .then(() => res.status(200).send(`User: ${req.body.username} added.`))
        .catch((err) =>
          res.status(400).json({ Error: err, User: req.body.username })
        );
    } else {
      const newUser = new User({
        username,
        password,
        date,
      });
      newUser
        .save()
        .then(() => console.log(`User: ${req.body.username} added.`))
        .then(() => res.status(200).send(`User: ${req.body.username} added.`))
        .catch((err) =>
          res.status(400).json({ Error: err, User: req.body.username })
        );
    }
  }
});

/**
 * Delete function for user route. Meant to be used to delete a user.
 * @param req.body.username Username of the user to delete
 * @param req.body.password Password of the user the client wants to delete, will delete user if authentification is completed.
 * @return status of operation as well as context for that status.
 */
router.route("/delete").post(async (req, res) => {
  // First authentification to make sure the client should be allowed to delete this account.
  const aUser = await User.find({ username: req.body.username });
  if (aUser.length < 1) {
    console.log("User does not exist.");
    res.status(406).json({ authenticated: false, reason: "User not found" });
  } else {
    if (aUser[0].password !== req.body.password) {
      console.log(
        `cannot delete User: ${req.body.username}\n bad password: ${req.body.password}`
      );
      res.status(200).json({ authenticated: false, reason: "bad password" });
    } else {
      // query for user to delete
      const query = { username: req.body.username };

      User.deleteOne(query, (err, result) => {
        if (err) {
          res.send(
            `Error when attempting to delete user: ${req.body.username}\nError: ${err}`
          );
        }
      });
    }
  }
});

/**
 * This is the route to add a home location to a user that does not have one set. It specifically works for
 * users that have a null equivalent value for their home location.
 * @param req.body.username The username of the user the client wants to add a home location to.
 * @param req.body.password The password of said user so we can authenticate that they should be able to access this user.
 * @return A json object that indicates success as well as a reason for that success
 */
router.route("/addHomeLocation").post(async (req, res) => {
  await User.find({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      if (user.length > 1) {
        console.log("User does not exist.");
        res.status(406).json({ success: false, reason: "User not found" });
      } else {
        if (user[0].password !== req.body.password) {
          console.log(
            `Cannot add home location to User: ${req.body.username}\nBad password: ${req.body.password}`
          );
          res.status(200).json({ success: false, reason: "bad password" });
        } else {
          // We want to add not replace
          if (user[0].homeLocation === "") {
            user[0].homeLocation = req.body.homeLocation;
            res.status(200).json({ success: true });
          } else {
            // don't replace
            console.log(
              `Cannot add home location to User: ${req.body.username}\nhomeLocation alredy exists`
            );
            res
              .status(200)
              .json({ success: false, reason: "homeLocation already exists" });
          }
        }
      }
    })
    .catch((err) =>
      res.status(400).json({
        success: false,
        reason: `Error: ${err} for User: ${req.body.username}`,
      })
    );
});

/**
 * This is the route to update a home location for a user. It specifically works for
 * users that want to update a home location rather than add one to a null equivalent value.
 * @param req.body.username The username of the user the client wants to add a home location to.
 * @param req.body.password The password of said user so we can authenticate that they should be able to access this user.
 * @return A json object that indicates success as well as a reason for that success
 */
router.route("/updateHomeLocation").post(async (req, res) => {
  await User.find({
    username: req.body.username,
    password: req.body.password,
  })
    .then((user) => {
      if (user.length > 1) {
        console.log("User does not exist.");
        res.status(406).json({ success: false, reason: "User not found" });
      } else {
        if (user[0].password !== req.body.password) {
          console.log(
            `Cannot add home location to User: ${req.body.username}\nBad password: ${req.body.password}`
          );
          res.status(200).json({ success: false, reason: "bad password" });
        } else {
          // We want to add not replace
          if (user[0].homeLocation === "") {
            user[0].homeLocation = req.body.homeLocation;
            res.status(200).json({ success: true });
          } else {
            // don't replace
            console.log(
              `Cannot add home location to User: ${req.body.username}\nhomeLocation alredy exists`
            );
            res
              .status(200)
              .json({ success: false, reason: "homeLocation already exists" });
          }
        }
      }
    })
    .catch((err) =>
      res.status(400).json({
        success: false,
        reason: `Error: ${err} for User: ${req.body.username}`,
      })
    );
});


module.exports = router;
