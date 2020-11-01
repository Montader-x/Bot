const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "channelDelete",
  async execute(client, channel) {
    const w = await channel.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");
    if(!webhook) return;
    let msg = "";
    if (channel.type === "category") {
      msg = `Category: **${channel.name}** was deleted`;
    } else {
      msg = `Channel: **${channel.name}** was deleted`;
    }

    const embed = new MessageEmbed()
      .setTitle("Channel deleted")
      .setDescription(msg)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed)
  },
};