const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "channelCreate",
  async execute(client, channel) {
    const w = await channel.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");
    if(!webhook) return;
    let msg = "";

    if (channel.type === "category") {
      msg = `Category: **${channel}** was created`;
    } else {
      msg = `Channel: **${channel}** was created`;
    }

    const embed = new MessageEmbed()
      .setTitle("Channel Created")
      .setDescription(msg)
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed)
  },
};