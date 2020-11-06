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
  const userReply = args.join(" ")
  if(userReply !== "rock" && userReply !== "paper" && userReply !== "scissors") return message.reply("Use for example: \"rock\", \"paper\", \"scissors\"")
        let embed = new MessageEmbed()
            .setTitle("Rock Paper Scissors")
            .setColor("BLUE")
            .addField(`My answer:`, reply)
            .addField("Your answer:", userReply)
            .setFooter(message.author.username);

        message.channel.send(embed);
  }
}