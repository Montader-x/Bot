const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "emojiUpdate",
  async execute(client, oldEm, newEm) {
    const w = await oldEm.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");
    if(!webhook) return;
    let msg = "";

    if (oldEm.name !== newEm.name) {
      msg = `Emoji: **${oldEm.name}** was renamed to **${newEm.name}** (${newEm})`;
    } {
      msg = `Emoji: **${newEm.name}** was updated (${newEm})`;
    }

    const embed = new MessageEmbed()
      .setTitle("Emoji Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed)
  },
};