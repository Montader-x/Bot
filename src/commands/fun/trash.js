const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
module.exports = {
  name: "trash",
  category: "fun",
  description: "put someone in the garbage can",
  usage: "changemymind <member>",
  run: async (client, message, args) => {

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const url = user.user.displayAvatarURL()
    const sendMsg = await message.channel.send("⚙ Processing Image..");

    const data = await fetch(
      `https://nekobot.xyz/api/imagegen?type=trash&url=${url}`
    ).then((res) => res.json());

    
    const embed = new MessageEmbed()
      .setFooter(message.author.username)
      .setColor("BLUE")
      .setDescription(
        `[Click here if the image failed to load.](${data.message})`
      )
      .setImage(data.message)
      .setTimestamp();
   
      sendMsg.edit(embed);
  }
}