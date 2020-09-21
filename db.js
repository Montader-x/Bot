const { MongoClient } = require("salvage.db"); //! what... is... this...
const db = new MongoClient({
  mongoURI: require("./token.json").Mongo,
  schema: {
    name: "tovade",
  },
});
module.exports = db;