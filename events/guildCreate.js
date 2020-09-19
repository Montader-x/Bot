const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
module.exports = {
    name: "guildCreate",
    async execute(client, guild) {
const LogBed = new MessageEmbed()
.setTitle(`i have joined ${guild}`);
let prefix = db.get(`prefix_${guild.id}`)
if(prefix === null) return db.set(`prefix_${guild.id}`, "a!")
let channelID
let channels = guild.channels.cache
channelLoop:
for (let c of channels) {
  let channelType = c[1].type
  if (channelType === "text") {
      channelID = c[0]
      break channelLoop
    }
}  
let channel = client.channels.cache.get(guild.systemChannelID || channelID);

channel.send("Thanks for adding me to your server for a list of my commands do a!help");
const w = await client.guilds.cache.get("740295580886106233").fetchWebhooks()
const webhook = w.find(w => w.name === "Dev logs");
webhook.send(LogBed)



  }
}