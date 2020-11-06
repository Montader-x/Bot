const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "setmute",
  category: "config",
  usage: "setMute <@role>",
  description: "Set the mute role",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR"))
      return message.channel.send(
        `${message.author.tag} You don't have perms to do that.`
      );
    let role =
      message.mentions.roles.first() || message.guild.roles.cache.get(args[0]); //mentioned channel

    if (!role) {
      //if channel is not mentioned
      return message.channel.send("Please Mention the role first");
    }

    //Now we gonna use quick.db

    await client.updateConfig(message.guild, { muteRole: role.id || role });

    message.channel.send(`mute  Role is seted as ${role}`); //send success message
  },
};
