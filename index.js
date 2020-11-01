const {  imdbKey } = require("./config.json");
const imdb = require("imdb-api");
const Discord = require("discord.js");
const fs = require('fs');
const token = require(`./token.json`);
const { Client, MessageEmbed, Guild, ShardingManager } = require('discord.js');
const { GiveawaysManager } = require('discord-giveaways')
const client = new Discord.Client({
  disableMentions: "everyone",
  partials: ["MESSAGE", "REACTION", "USER", "GUILD_MEMBER"],
  ws: { properties: { $browser: "Discord Android" }}
});
const shardManager = new ShardingManager('./index.js', {
  // for ShardingManager options see:
  // https://discord.js.org/#/docs/main/v11/class/ShardingManager

  // 'auto' handles shard count automatically
  totalShards: "auto",
  respawn: true,

});

const { getServerPrefix } = require("./utils/functions");
const { init } = require('./utils/mongoose')
init()
const logs = require('discord-logs');
logs(client);
const prefix = getServerPrefix()
const db = require("quick.db") ;
//const { addexp } = require("./handlers/xp.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.queue = new Map()
client.prefix = prefix; 
client.snipes = new Map()
client.afk = new Map()
client.imdb = new imdb.Client({ apiKey: imdbKey });
client.config = require("./config.json");
const GiveawayManagerWithShardSupport = class extends GiveawaysManager {

  // Refresh storage method is called when the database is updated on one of the shards
  async refreshStorage(){
      // This should make all shard refreshing their cache with the updated database
      return client.shard.broadcastEval(() => this.giveawaysManager.getAllGiveaways());
  }

};

// Create a new instance of your new class
const manager = new GiveawayManagerWithShardSupport(client, {
  storage: "./storage.json",
  updateCountdownEvery: 10000,
  default: {
      botsCanWin: false,
      exemptPermissions: [ "MANAGE_MESSAGES", "ADMINISTRATOR" ],
      embedColor: "#FF0000",
      reaction: "🎉"
  }
});

client.giveawaysManager = manager;

["command"].forEach(handler => { 
  require(`./handlers/${handler}`)(client);
})

require("./handlers/event")(client);

client.login(token.Token);