const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
module.exports = {
    name: "guildCreate",
    async execute(client, guild) {
const LogBed = new MessageEmbed()
.setTitle(`i have joined ${guild}`)
client.channels.cache.get('749358808337481811').send(LogBed)
      let prefix = db.get(`prefix_${message.guild.id}`);
      if(prefix === null) db.set(`prefix_${message.guild.id}`, 
      "a!");
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

channel.send("Thanks for adding me to your server for a list of my commands do ?help");




  }
}