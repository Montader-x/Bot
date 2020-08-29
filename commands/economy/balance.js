const { MessageEmbed } = require('discord.js')
const db = require('quick.db')

module.exports = {
    name: "balance",
    description: "check how much money you have",
    category: "economy",
    aliases: ["bal", "money"],
    usage: "balance",
     run:  async (bot, message, args, color) => {
      let bal = db.get(`money_${message.author.id}`)
      let user = message.mentions.members.first() || message.member
     if (bal === null) bal = 0;
     let bank = db.get(`bank_${message.author.id}`)
     if (bank === null) bank = 0;
     const username = user.user.tag
    const embed = new MessageEmbed()
    .setTitle(`${username}'s Balance`)
    .setColor("BLUE")
    .addField("Pocket:", bal);
    

    message.channel.send(embed);
 }
}