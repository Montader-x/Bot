const Discord = require("discord.js");
module.exports = {
  name: "setleave",
  category: "config",
  usage: "setleave <#channel>",
  description: "Set the leave channel",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );
    let channel = message.mentions.channels.first(); //mentioned channel

    if (!channel) {
      //if channel is not mentioned
      return message.channel.send("Please Mention the channel first");
    }

    await client.updateConfig(message.guild, { leaveChannel: channel.id });

    message.channel.send(`Leave Channel is setted as ${channel}`); //send success message
  },
};
