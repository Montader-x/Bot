const { Schema, model } = require("mongoose")

module.exports = model(
    "config",
    new Schema({
        GuildID: String,
        welcomeChannel: String,
        leaveChannel: String,
        autoRole: String,
        levelMessage: { type: Boolean, default: false},
    })
)