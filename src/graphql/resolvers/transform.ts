export {};
const { dateToString } = require("../../helpers/date");

const transformData = (data: any) => {
  return {
    ...data._doc,
    _id: data.id,
    date: dateToString(data._doc.date),
  };
};

const handleNaNData = (data: any) => {
  return {
    _id: data._id,
    date: data.date,
    tested: !isFinite(data.tested) || isNaN(data.tested) ? 0 : data.tested,
    cases: !isFinite(data.cases) || isNaN(data.cases) ? 0 : data.cases,
    deaths: !isFinite(data.deaths) || isNaN(data.deaths) ? 0 : data.deaths,
  };
};

const newReports = (sortedData: any) => {
  let newReports = sortedData.map((n: any, i: any, res: any) => {
    if (i === 0) {
      return;
    }
    return {
      _id: n._id,
      date: dateToString(n.date),
      tested: n.tested - res[i - 1].tested,
      cases: n.cases - res[i - 1].cases,
      deaths: n.deaths - res[i - 1].deaths,
    };
  });

  newReports.shift();

  return newReports;
};

const newReportsPercentageChange = (sortedData: any) => {
  let newReportsDataPC = sortedData.map((n: any, i: any, res: any) => {
    if (i === 0) {
      return;
    }
    return {
      _id: n._id,
      date: dateToString(n.date),
      tested: Number(
        (((n.tested - res[i - 1].tested) / n.tested) * 100).toFixed(2)
      ),
      cases: Number(
        (((n.cases - res[i - 1].cases) / n.cases) * 100).toFixed(2)
      ),
      deaths: Number(
        (((n.deaths - res[i - 1].deaths) / n.deaths) * 100).toFixed(2)
      ),
    };
  });

  newReportsDataPC.shift();
  return newReportsDataPC.map((data: any) => {
    return handleNaNData(data);
  });
};

const rollingAverage = (transformedData: any, rollingAverageNumber: number) => {
  let rollingAverageData = transformedData.map((n: any, i: any, res: any) => {
    const testedValuesToAverage = transformedData.map((res: any) => {
      return res.tested;
    });

    const casesValuesToAverage = transformedData.map((res: any) => {
      return res.cases;
    });

    const deathsValuesToAverage = transformedData.map((res: any) => {
      return res.deaths;
    });

    return {
      _id: n._id,
      date: n.date,
      tested: Number(
        (
          testedValuesToAverage
            .slice(i - rollingAverageNumber + 1, i + 1)
            .reduce((a: any, b: any) => a + b, 0) / rollingAverageNumber
        ).toFixed(2)
      ),
      cases: Number(
        (
          casesValuesToAverage
            .slice(i - rollingAverageNumber + 1, i + 1)
            .reduce((a: any, b: any) => a + b, 0) / rollingAverageNumber
        ).toFixed(2)
      ),

      deaths: Number(
        (
          deathsValuesToAverage
            .slice(i - rollingAverageNumber + 1, i + 1)
            .reduce((a: any, b: any) => a + b, 0) / rollingAverageNumber
        ).toFixed(2)
      ),
    };
  });

  return rollingAverageData.map((data: any) => {
    return handleNaNData(data);
  });
};

const kpi = (sortedData: any) => {
  const newReportsData = newReports(sortedData).reverse();
  sortedData.reverse();
  return {
    todayTested: newReportsData[0].tested,
    todayCases: newReportsData[0].cases,
    todayDeaths: newReportsData[0].deaths,
    deltaTested: newReportsData[0].tested - newReportsData[1].tested,
    deltaCases: newReportsData[0].cases - newReportsData[1].cases,
    deltaDeaths: newReportsData[0].deaths - newReportsData[1].deaths,
    totalTested: sortedData[0].tested,
    totalCases: sortedData[0].cases,
    totalDeaths: sortedData[0].deaths,
  };
};

const transformUser = async (user: any) => {
  return {
    ...user._doc,
    _id: user.id,
    password: null,
  };
};

exports.transformData = transformData;
exports.newReports = newReports;
exports.rollingAverage = rollingAverage;
exports.newReportsPercentageChange = newReportsPercentageChange;
exports.transformUser = transformUser;
exports.kpi = kpi;
