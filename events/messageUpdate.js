const { MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: "messageUpdate",
  async execute(client, oldMsg, newMsg) {
    if (!newMsg.guild) return;
    

    

    // not enabled
    if (webhookClient === null || !webhookClient) return;

    // channel not found/deleted
    if (
      !newMsg.guild.channels.cache.some((ch) => ch.name === auditChannel.name)
    )
      return;
      if (newMsg.author.id === client.user.id) return;
      if(newMsg.content === oldMsg.content) return;

    const embed = new MessageEmbed()
      .setTitle(`Message updated in **${newMsg.channel.name}**`)
      .setDescription(`Message send by **${newMsg.author.tag}** was edited`)
      .addField("**Old Message**", oldMsg)
      .addField("**New Message**", newMsg)
      .setColor("ORANGE")
      .setTimestamp();

    
  },
};