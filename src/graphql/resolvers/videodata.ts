export {};

const fetch = require("node-fetch");

const RawData = require("../../models/rawdata");

const VideoData = require("../../models/videodata");

const videoData = async (args: any, req: any) => {
  try {
    const videoData = await VideoData.find().select("-_id date").sort("-date");
    let videoDates = <any>[];
    videoData.map((d: any) => {
      videoDates.push(d.date);
    });

    const data = await RawData.find({ date: { $nin: videoDates } })
      .select("-_id date cases tested deaths")
      .sort("-date");

    data.map((d: any) => {
      new VideoData({
        date: d.date,
        cases: d.cases,
        tested: d.tested,
        deaths: d.deaths,
        renderstatus: "ready",
      }).save();
    });

    const res = await VideoData.find();
    return res.map((d: any) => {
      return {
        _id: d._id,
        cases: d.cases,
        tested: d.tested,
        deaths: d.deaths,
        renderstatus: d.renderstatus,
        date: new Date(d.date).toUTCString(),
      };
    });
  } catch (error) {
    throw error;
  }
};

const renderedVideo = async (args: any, req: any) => {
  try {
    await VideoData.findOneAndUpdate(
      { _id: args.id },
      {
        $set: {
          renderstatus: "done",
        },
      },
      { returnNewDocument: true }
    );
    await fetch(
      "https://dropbox-writer.azurewebsites.net/api/dropbox-writer-trigger?code=r9aZ5b9rOTi7CJK6GWYZbzXaKqDAizO4CmqAUehXj0NrXRCDEfGFHA==&name=matt"
    );

    return true;
  } catch (error) {
    throw error;
  }
};
exports.videoData = videoData;
exports.renderedVideo = renderedVideo;
