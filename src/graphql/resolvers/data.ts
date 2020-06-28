export {};

const RawData = require("../../models/rawdata");

const { dateToString } = require("../../helpers/date");
const {
  transformData,
  newReports,
  newReportsPercentageChange,
  rollingAverage,
  kpi,
} = require("./transform");

const addNewData = async (args: any, req: any) => {
  if (!req.isAuth) {
    throw new Error("Not authorized!");
  }
  const newData = new RawData({
    date: args.date,
    tested: args.tested,
    cases: args.cases,
    deaths: args.deaths,
  });

  try {
    await newData.save();
    return newData;
  } catch (err) {
    throw err;
  }
};

const updateData = async (args: any, req: any) => {
  if (!req.isAuth) {
    throw new Error("Not authorized!");
  }
  try {
    const recordToUpdate = await RawData.findOneAndUpdate(
      { _id: args.reportId },
      {
        $set: {
          date: dateToString(args.date),
          tested: args.tested,
          cases: args.cases,
          deaths: args.deaths,
        },
      },
      { returnNewDocument: true }
    );
    return recordToUpdate;
  } catch (error) {
    throw error;
  }
};

const deleteData = async (args: any, req: any) => {
  if (!req.isAuth) {
    throw new Error("Not authorized!");
  }
  try {
    await RawData.findOneAndRemove({
      _id: args.reportId,
    });

    return true;
  } catch (error) {
    throw error;
  }
};

const rawData = async (args: any, req: any) => {
  try {
    let rawData;
    if (!args.pageSize || !args.pageNumber) {
      rawData = await RawData.find().sort("date");
    } else {
      rawData = await RawData.find()
        .sort("-date")
        .skip((args.pageNumber - 1) * args.pageSize)
        .limit(args.pageSize);
    }

    return rawData.map((data: any) => {
      return transformData(data);
    });
  } catch (err) {
    throw err;
  }
};

const noOfResults = async (args: any, req: any) => {
  try {
    return await RawData.count();
  } catch (error) {
    throw error;
  }
};

const newReportsData = async (args: any, req: any) => {
  try {
    const rawDataResult = await rawData(args, req);

    const newReportsData = newReports(rawDataResult);
    const newReportsWA = rollingAverage(
      newReportsData,
      args.rollingAverageWindow
    );

    return newReportsData.map((v: any, i: number) => {
      return {
        date: v.date,
        tested: {
          value: v.tested,
          windowValue: newReportsWA[i].tested,
        },
        cases: {
          value: v.cases,
          windowValue: newReportsWA[i].cases,
        },
        deaths: {
          value: v.deaths,
          windowValue: newReportsWA[i].deaths,
        },
      };
    });
  } catch (error) {
    throw error;
  }
};

const newReportsPercentageChangeData = async (args: any, req: any) => {
  try {
    const rawDataResult = await rawData(args, req);

    const newReportsPC = newReportsPercentageChange(rawDataResult);

    const newReportsPCWA = rollingAverage(
      newReportsPC,
      args.rollingAverageWindow
    );

    return newReportsPC.map((v: any, i: number) => {
      return {
        date: v.date,
        tested: {
          value: v.tested,
          windowValue: newReportsPCWA[i].tested,
        },
        cases: {
          value: v.cases,
          windowValue: newReportsPCWA[i].cases,
        },
        deaths: {
          value: v.deaths,
          windowValue: newReportsPCWA[i].deaths,
        },
      };
    });
  } catch (error) {
    throw error;
  }
};

const kpiData = async (args: any, req: any) => {
  try {
    const rawDataResult = await rawData(args, req);
    return kpi(rawDataResult);
  } catch (error) {
    throw error;
  }
};

exports.addNewData = addNewData;
exports.rawData = rawData;
exports.newReportsData = newReportsData;
exports.newReportsPercentageChangeData = newReportsPercentageChangeData;
exports.updateData = updateData;
exports.deleteData = deleteData;
exports.noOfResults = noOfResults;
exports.kpiData = kpiData;
