const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Game = new Schema(
  {
    gameName: {
      type: String,
      required: true,
    },
    minimumPlayers: {
      type: Number,
      required: true,
    },
    maximumPlayers: {
      type: Number,
      required: true,
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
    reocurring: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Game", Game);
