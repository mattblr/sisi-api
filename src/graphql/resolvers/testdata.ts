export {};

const fetch = require("node-fetch");

const TestData = require("../../models/testdata");

// const { transformData } = require("./transform");

const testData = async (args: any, req: any) => {
  try {
    const testData = await TestData.find({
      renderstatus: "ready",
    });
    return testData;
    //       .map((datum: any) => {
    //   return transformData(datum);
    // });
  } catch (error) {
    throw error;
  }
};

const addTestData = async (args: any, req: any) => {
  const newTestData = new TestData({
    date: new Date().toUTCString(),
    teamOneName: args.teamOneName,
    teamOneScore: args.teamOneScore,
    teamOneHex: args.teamOneHex,
    teamTwoName: args.teamTwoName,
    teamTwoScore: args.teamTwoScore,
    teamTwoHex: args.teamTwoHex,
    renderstatus: "ready",
  });
  try {
    await newTestData.save();
    await fetch(
      "http://test-data-dropbox-writer.azurewebsites.net/api/test-data-dropbox-writer?code=Zf65AKzHoubWP2Iu9dXAXWCnYQHgpcXKeTN4vqHynw1K8JPmaNDd0A==&name=matt"
    );
    return newTestData;
  } catch (error) {
    throw error;
  }
};

const renderedTestVideo = async (args: any, req: any) => {
  try {
    await TestData.findOneAndUpdate(
      { _id: args.id },
      {
        $set: {
          renderstatus: "done",
        },
      },
      { returnNewDocument: true }
    );
    await fetch(
      "http://test-data-dropbox-writer.azurewebsites.net/api/test-data-dropbox-writer?code=Zf65AKzHoubWP2Iu9dXAXWCnYQHgpcXKeTN4vqHynw1K8JPmaNDd0A==&name=matt"
    );

    return true;
  } catch (error) {
    throw error;
  }
};
exports.testData = testData;
exports.renderedTestVideo = renderedTestVideo;
exports.addTestData = addTestData;
