const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "channelUpdate",
  async execute(client, oldChannel, newChannel) {
    const w = await oldChannel.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");

    let msg = "";
    const type = oldChannel.type;

    if (type === "category") {
      if (oldChannel.name !== newChannel.name) {
        msg = `Category **${newChannel}** was updated from \`${oldChannel.name}\` to \`${newChannel.name}\``;
      } else {
        msg = `Category: ${newChannel} was updated`;
      }
    } else {
      if (oldChannel.name !== newChannel.name) {
        msg = `Channel **${oldChannel.name}** was renamed to ${newChannel}`;
      } else if (oldChannel.topic !== newChannel.topic) {
        msg = `Channel topic in channel ${newChannel} was updated from \`${oldChannel.topic}\` to \`${newChannel.topic}\``;
      } else {
        msg = `Channel: ${newChannel} was updated`;
      }
    }

    const embed = new MessageEmbed()
      .setTitle("Channel Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed)
  },
};