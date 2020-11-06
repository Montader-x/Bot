const Discord = require("discord.js");
module.exports = {
  name: "setwelcome",
  category: "config",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
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

    await client.updateConfig(message.guild, { welcomeChannel: channel.id });

    message.channel.send(`Welcome Channel is setted as ${channel}`); //send success message
  },
};
