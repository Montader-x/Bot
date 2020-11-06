const { MessageEmbed } = require("discord.js");
const { owners } = require("../../config.json");

module.exports = {
  name: "guilds",
  description: "View all guilds the bot is in",
  category: "owner",
  run: (client, message) => {
    if (message.author.id !== owners[0] && message.author.id !== owners[1])
      return message.reply("Only the owner is allowed to run this command");

    const guilds = client.guilds.cache;

    const embed = new MessageEmbed()
      .setTitle(`Guilds for ${client.user.username}`)
      .setColor("BLUE")
      .setFooter(message.author.tag);

    let description = "";
    guilds.forEach((guild) => {
      description += `**${guild.name}:** Id: ${guild.id}\n`;
    });

    embed.setDescription(description);

    message.channel.send({ embed });
  },
};