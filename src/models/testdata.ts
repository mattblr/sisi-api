export {};

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testData = new Schema({
  date: {
    type: Date,
    required: true,
  },
  teamOneName: {
    type: String,
    required: true,
  },
  teamOneScore: {
    type: String,
    required: true,
  },
  teamOneHex: {
    type: String,
    required: true,
  },
  teamTwoName: {
    type: String,
    required: true,
  },
  teamTwoScore: {
    type: String,
    required: true,
  },
  teamTwoHex: {
    type: String,
    required: true,
  },
  renderstatus: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("TestData", testData);
