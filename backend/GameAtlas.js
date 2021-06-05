// Import dependencies
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(express.static("../public"));
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

// Commented out because I'm unable to whitelist my current IP to connect to the database.
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\pages\\index.html"));
});

app.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\pages\\authentification\\register.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\pages\\authentification\\login.html"));
});

app.get("/logout", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\pages\\authentification\\logout.html"));
});

app.get("/game", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\pages\\game\\game.html"));
});

app.get("/location", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\pages\\location\\location.html"));
});

app.get("/addGame", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\pages\\game\\addGame.html"));
});

app.get("/addLocation", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\pages\\location\\addLocation.html"));
});

app.get("/findLocation", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\pages\\location\\findLocation.html"));
});

// Set user router variables
const userRouter = require("./routes/users.js");
const locationRouter = require("./routes/locations.js");
const gameRouter = require("./routes/games.js");

// set them to be used based on the url of said request.
app.use("/users", userRouter);
app.use("/locations", locationRouter);
app.use("/games", gameRouter);

app.use((req, res) => {
  res.status(404).send("404 error, page not found");
});

const expressServer = app.listen(port, () => {
  console.log(`Server \nPort: ${port}\n`);
});
