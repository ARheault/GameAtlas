// Import dependencies
const express = require("express");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;

// Commented out because I'm unable to whitelist my current IP to connect to the database.
/*mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});

const server = require("http").Server(app);
*/


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\index.html"));
});

// Set user router variables
const userRouter = require("./routes/users.js");
const locationRouter = require("./routes/locations.js")
const gameRouter = require("./routes/games.js")

// set them to be used based on the url of said request.
app.use("/users", userRouter);
app.use("/locations", locationRouter);
app.use("/games", gameRouter);

const expressServer = app.listen(port, () => {
  console.log(`Server \nPort: ${port}\n`);
});
