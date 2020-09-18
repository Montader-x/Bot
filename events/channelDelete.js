const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "channelDelete",
  async execute(client, channel) {
    const auditChannel = await getAuditChannel(channel.guild.id);

    
    if (auditChannel === null || !auditChannel) return;

    
    if (
      !channel.guild.channels.cache.some((ch) => ch.name === auditChannel.name)
    )
      return;

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

    client.channels.cache.get(auditChannel.id).send({ embed });
  },
};