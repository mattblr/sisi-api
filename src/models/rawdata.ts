export {};

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const rawData = new Schema({
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
});

module.exports = mongoose.model("RawData", rawData);
