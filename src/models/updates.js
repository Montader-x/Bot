const { Schema, model } = require("mongoose");

module.exports = model(
  "updates",
  new Schema({
    name: "Andoi",
    updates: Array,
  })
);
