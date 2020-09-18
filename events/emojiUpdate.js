const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "emojiUpdate",
  async execute(client, oldEm, newEm) {
    const auditChannel = await getAuditChannel(oldEm.guild.id);

    // not enabled
    if (auditChannel === null || !auditChannel) return;

    // channel not found/deleted
    if (
      !oldEm.guild.channels.cache.some(
        (ch) => ch.name === auditChannel.name
      )
    )
      return;

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

    client.channels.cache.get(auditChannel.id).send({ embed });
  },
};