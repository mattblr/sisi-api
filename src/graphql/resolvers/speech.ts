export {};

const WordFreq = require("../../models/wordfreq");

const wordFreq = async (args: any, req: any) => {
  try {
    let wordFreqData;
    if (!args.pageSize && !args.pageNumber && !args.filter) {
      wordFreqData = await WordFreq.find().sort("-frequency");
    } else if (args.filter) {
      wordFreqData = await WordFreq.find({
        word: { $in: args.filter },
      }).sort("-frequency");
    } else {
      wordFreqData = await WordFreq.find()
        .sort("-frequency")
        .skip((args.pageNumber - 1) * args.pageSize)
        .limit(args.pageSize);
    }
    return wordFreqData;
  } catch (error) {
    throw error;
  }
};

exports.wordFreq = wordFreq;
