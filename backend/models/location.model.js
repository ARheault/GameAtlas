const mongoose = require("mongoose");
const Game = require("./game.model");
const Schema = mongoose.Schema;

const Location = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    games: [
      {
        type: Game,
        required: true,
      },
    ],
    numGames: {
      type: Number,
      required: true,
      default: 0,
    },
    creators: [
      {
        type: String,
        required: true,
      },
    ],
    dateCreated: {
      type: Date,
      required: true,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Location", Location);
