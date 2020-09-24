const { MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: "guildMemberRemove",
  async execute(client, member) {
    if (!member.guild) return;
    const leaveChannel = await db.get(`welchannel_${member.guild.id}`);

    // not enabled
    if (leaveChannel === null || !leaveChannel) return;

    // channel not found/deleted


    const embed = new MessageEmbed()
      .setTitle("👋 Goodbye!")
      .setDescription(`User: ${member} has left ${member.guild.name}`)
      .setColor("BLUE")
      .setTimestamp()
      .setImage("https://media.giphy.com/media/26u4b45b8KlgAB7iM/giphy.gif")
      .setFooter(client.user.username);

    client.channels.cache.get(leaveChannel).send({ embed });
  },
};