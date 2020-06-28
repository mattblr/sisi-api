const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type ValueAndWindow {
    value: Float!
    windowValue: Float!
}

type RawData {
    _id: ID!
    date: String!
    tested: Int
    cases: Int
    deaths: Int
}

type ModelledData {
    _id: String!
    date: String!
    tested: ValueAndWindow!
    cases: ValueAndWindow!
    deaths: ValueAndWindow!
}

type KPIData {
    todayTested: Int!
    todayCases: Int!
    todayDeaths: Int!
    deltaTested: Int!
    deltaCases: Int!
    deltaDeaths: Int!
    totalTested: Int!
    totalCases: Int!
    totalDeaths: Int!
}

type WordFreq {
    _id: ID!
    word: String!
    frequency: Int!
}

type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

type User {
    _id: ID!
    email: String!
    password: String!
}

type VideoData {
    _id: ID!
    date: String!
    cases: Int!
    tested: Int!
    deaths: Int!
    renderstatus: String!
}

type TestData {
    _id: ID!
    date: String!
    teamOneName: String!
    teamOneScore: String!
    teamOneHex: String!
    teamTwoName: String!
    teamTwoScore: String!
    teamTwoHex: String!
    renderstatus: String!
}

type RootQuery {
    rawData(pageSize: Int, pageNumber:Int): [RawData!]!
    login(email:String!, password:String!):AuthData!
    newReportsData(rollingAverageWindow: Int!): [ModelledData]
    newReportsPercentageChangeData(rollingAverageWindow: Int!): [ModelledData]
    noOfResults: Int!
    kpiData: KPIData!
    wordFreq(pageSize: Int, pageNumber: Int, filter: [String]): [WordFreq!]!
    testData: [TestData!]
}

type RootMutation {
    addNewData(date:String!, tested: Int!, cases: Int!, deaths: Int!): RawData!
    createUser(email:String!, password:String!):User!
    updateData(reportId: ID!, date: String!, tested: Int!, cases: Int!, deaths: Int!):RawData!
    deleteData(reportId: ID!):Boolean
    videoData: [VideoData!]!
    renderedVideo(id: ID!): Boolean
    renderedTestVideo(id: ID!): Boolean
    addTestData(teamOneName: String!, teamOneScore: String!, teamOneHex: String!, teamTwoName: String!, teamTwoScore: String!, teamTwoHex: String!):TestData
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`);
