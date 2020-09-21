 const db = require('quick.db')
 const { MessageEmbed } = require('discord.js')

 module.exports = {
   name: "ticketsetup",
   usage: "ticketsetup <channel>",
   description: "does something",
   category: "tickets",
   run: (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR"))
     return message.channel.send("You need admin for this")
      let channel = message.mentions.channels.first();
      if(!channel) return message.channel.send("mention a channel first");
  
      let sent = new MessageEmbed()
      .setTitle("Ticket System")
      .setDescription("React to open a ticket!")
      .setFooter("Ticket System")
      .setColor("00ff00")
   
     channel.send(sent).then(msg => {
        msg.react('🎫');
        db.set(`ticketMessageId_${message.guild.id}`, msg.id)
     }) //! try 
     //! tell me if worked so i cann close 
     
      message.channel.send("Ticket System Setup Done!")
   }
   
 }
