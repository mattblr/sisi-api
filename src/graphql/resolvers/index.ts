const dataResolver = require("./data");
const userResolver = require("./auth");
const speechResolver = require("./speech");
const videoResolver = require("./videodata");
const testResolver = require("./testdata");

const rootResolver = {
  ...dataResolver,
  ...userResolver,
  ...speechResolver,
  ...videoResolver,
  ...testResolver,
};

module.exports = rootResolver;
