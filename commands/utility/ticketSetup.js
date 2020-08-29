 const Discord = require('discord.js')
 const TicketModel = require("../../models/Ticket.js");

module.exports = {
  name: "setticket",
  category: "config",
  description: "setup the ticket system",
  aliases: ["setupT"],
  usage: "setticket <channel>",
  run: async (client, message, args) => {
    if (!message.member.permissions.has("ADMINISTRATOR"))
    return message.channel.send(`You do not have permissions!`);
        let channel = message.mentions.channels.first();
        if(!channel) return message.reply("Mention a channel first!");
        let reaction = args[1]

        let sent = await channel.send(new Discord.MessageEmbed()
            .setTitle("Ticket System")
            .setDescription("React to open a ticket!")
            .setFooter("Ticket System")
            .setColor("00ff00")
        );

        sent.react("✉️")
        const newData = new TicketModel({
          Guild: message.guild.id,
          MessageID: sent.id,
          Reaction: "✉️"

        });
        newData.save();
        

        message.channel.send("Ticket System Setup Done!")
  }
}