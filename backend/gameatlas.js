const express = require('express');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = "mongodb+srv://OurTeam:OurPass@cluster0.osqu2.mongodb.net/GameAtlasDB?";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
const server = require('http').Server(app);


app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\index.html"));
});

const expressServer = app.listen(port, () => {
  console.log(`Server \nPort: ${port}\n`);
});