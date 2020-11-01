const { MessageEmbed } = require("discord.js");
const db = require('quick.db')
module.exports = {
    name: "guildCreate",
    async execute(client, guild) {
const LogBed = new MessageEmbed()
.setTitle(`i have joined ${guild}`);
let prefix = db.get(`prefix_${guild.id}`)
if(prefix === null) return db.set(`prefix_${guild.id}`, "a!")

const w = await client.guilds.cache.get("740295580886106233").fetchWebhooks()
const webhook = w.find(w => w.name === "Dev logs");
if(!webhook) return;
webhook.send(LogBed)



  }
}