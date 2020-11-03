const { Schema, model } = require("mongoose");
const { configDefaultSettings } = require("../config.json");

module.exports = model(
  "config",
  new Schema({
    GuildID: String,
    welcomeChannel: String,
    leaveChannel: String,
    autoRole: String,
    levelMessage: {
      type: Boolean,
      default: configDefaultSettings.levelMessage,
    },
    prefix: { type: String, default: configDefaultSettings.prefix },
  }) //im working in config.js in utils
);
