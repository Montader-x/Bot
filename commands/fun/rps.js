const { MessageEmbed } = require('discord.js')
module.exports = {
  name: "rps",
  category: "fun",
  description: "play a game with the bot",
  aliases: ["rock-paper"],
  usage: "rps",
  run: (client, message, args) => {
   const replies = ["Rock", "Paper", "Scissors"];

   const reply = replies[Math.floor(Math.random() * replies.length)];

        const embed = new MessageEmbed()
            .setTitle("Rock Paper Scissors")
            .setColor("BLUE")
            .setDescription(`**${reply}**`)
            .setFooter(message.author.username);

        message.channel.send(embed);
  }
}