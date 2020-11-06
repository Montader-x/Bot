const { Schema, model } = require("mongoose");
const { configDefaultSettings } = require("../config.json");

module.exports = model(
  "config",
  new Schema({
    GuildID: String,
    welcomeChannel: String,
    leaveChannel: String,
    autoRole: String,
    muteRole: String,
    suggestChan: String,
    levelMessage: {
      type: Boolean,
      default: configDefaultSettings.levelMessage,
    },
    prefix: { type: String, default: configDefaultSettings.prefix },
  })
);
