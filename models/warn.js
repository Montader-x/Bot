const { Schema, model } = require('mongoose')


module.exports = model(
    "warn",
    new Schema({
        GuildID: String,
        UserID: String,
        reason: Array,
        moderator: Array
    })
)