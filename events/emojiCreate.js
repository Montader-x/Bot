const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "emojiCreate",
  async execute(client, emoji) {
    const w = await emoji.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");

    const embed = new MessageEmbed()
      .setTitle("New Emoji Created")
      .setDescription(`Emoji: **${emoji}** was created`)
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed)
  },
};