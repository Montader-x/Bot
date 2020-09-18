const {  default_prefix } = require("./config.json");
const { config } = require("dotenv");
const Discord = require("discord.js");
const fs = require('fs');

const enmap = require('enmap');

const { Client, MessageEmbed, Guild } = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways')
const client = new Discord.Client({
  disableMentions: "everyone",
  partials: ["MESSAGE", "REACTION", "USER", "GUILD_MEMBER"],
  ws: { properties: { $browser: "Discord Android" }}
});
const { getServerPrefix } = require("./utils/functions");
const token = require(`./token.json`);
const mongoose = require("mongoose");
mongoose.connect(token.Mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const logs = require('discord-logs');
logs(client);
const prefix = getServerPrefix()
const db = require("quick.db") ;
//const { addexp } = require("./handlers/xp.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map()
client.prefix = prefix; 



client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});












["command"].forEach(handler => { 
  require(`./handlers/${handler}`)(client);
})



require("./handlers/event")(client);



client.login(token.Token);