export {};

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const modelledData = new Schema({
  _id: {
    type: String,
    required: true,
  },
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

module.exports = mongoose.model("ModelledData", modelledData);
