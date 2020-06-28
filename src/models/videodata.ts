export {};

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const videoData = new Schema({
  date: {
    type: Date,
    required: true,
  },
  tested: {
    type: Number,
    required: true,
  },
  cases: {
    type: Number,
    required: true,
  },
  deaths: {
    type: Number,
    required: true,
  },
  renderstatus: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("VideoData", videoData);
