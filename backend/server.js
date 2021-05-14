// Importing dependencies
const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const port = process.env.PORT || 5000;

app.get("/GameAtlas/", (req, res) => {
  res.sendFile(path.join(__dirname, "..\\public\\index.html"));
});

const expressServer = app.listen(port, () => {
  console.log(`Server \nPort: ${port}\n`);
});
