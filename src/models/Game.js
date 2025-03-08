import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  releaseDate: {
    type: Date,
    default: Date.now(),
  },
  platform: {
    type: String,
  },

  status: {
    type: String,
    enum: ["ON-GOING", "COMPLETED", "GAMES", "RECOMMENDED"],
    default: "ON-GOING",
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ["IMAGE", "VIDEO"],
    default: "IMAGE",
  },
  category: {
    type: String,
    enum: [
      "ACTION",
      "ADVENTURE",
      "COMEDY",
      "DRAMA",
      "FAMILY",
      "FANTASY",
      "HORROR",
      "MUSIC",
      "MYSTERY",
      "ROMANCE",
      "SCI-FI",
      "SPORTS",
      "THRILLER",
      "WAR",
      "ANIMATION",
      "POPULAR",
      "HOT"
    ],
    default: "ACTION",
  },

  OS: {
    type: String,
    enum: ["WINDOWS", "MAC", "LINUX", "ANDROID", "IOS"],
    default: "WINDOWS",
  },
  languages: {
    type: String,
    enum: [
      "ENGLISH",
      "SPANISH",
      "FRENCH",
      "GERMAN",
      "ITALIAN",
      "JAPANESE",
      "CHINESE",
    ],
    default: "ENGLISH",
  },
  Genre: {
    type: String,
    enum: [
      "ACTION",
      "ADVENTURE",
      "COMEDY",
      "DRAMA",
      "FAMILY",
      "FANTASY",
      "HORROR",
      "MUSIC",
      "MYSTERY",
      "ROMANCE",
      "SCI-FI",
      "SPORTS",
      "THRILLER",
      "WAR",
    ],
    default: "ACTION",
  },
  tags: [
    {
      type: String,
    },
  ],
});

const Game = mongoose.models.Game || mongoose.model("Game", gameSchema);

export default Game;
