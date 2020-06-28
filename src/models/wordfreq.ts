export {};

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const wordfreq = new Schema({
  _id: {
    type: String,
    required: true,
  },
  word: {
    type: String,
    required: true,
  },
  frequency: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("WordFreq", wordfreq, "wordfreq");
