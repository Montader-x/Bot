const { Schema, model } = require("mongoose");
module.exports = model(
  "Ticket",
  new Schema({
    Guild: String,
    MessageID: String,
    Reaction: String,
  })
)