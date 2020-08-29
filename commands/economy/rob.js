const db = require('quick.db')
const Discord = require('discord.js')
const random = require("random");

module.exports = {
  name: "rob",
  description: "steal money from someone",
  category: "economy",
  usage: "rob <mention>",
  aliases: ["steal"],
  run: async (client, message, args, config) => {


    let user = message.mentions.members.first()
       if (!user) {
        return message.channel.send('Sorry, you forgot to mention somebody.')}
    let targetuser = await db.fetch(`money_${user.id}`) 
    let author = await db.fetch(`money_${message.author.id}`)



    if (author < 250) { // if the authors balance is less than 250, return this.
        return message.channel.send(':x: You need atleast 250$ to rob somebody.')
    }

    if (targetuser < 1) { // if mentioned user has 0 or less, it will return this.
        return message.channel.send(`:x: ${user.user.username} does not have anything to rob.`)
    }

      
    let rob = random.int(0, targetuser); 
    /*It grabs the amount of money the target has and places it as the limit*/

    let embed = new Discord.MessageEmbed()
    .setDescription(`${message.author} you robbed ${user} and got away with ${rob}!`)
    .setColor("GREEN")
    .setTimestamp()
    message.channel.send(embed)


    db.subtract(`money_${user.id}`, rob)
    db.add(`money_${message.author.id}`, rob)
  }
}