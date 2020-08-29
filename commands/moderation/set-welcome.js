const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setwelcome",
  category: "config",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",
  run: (client, message, args) => {
    
		if(!message.member.hasPermission("ADMINISTRATOR"))
		return message.channel.send(`${message.author.tag} You don't have perms to do that.`);
    let channel = message.mentions.channels.first() //mentioned channel
    
    if(!channel) { //if channel is not mentioned
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    db.set(`welchannel_${message.guild.id}`, channel.id) //set id in var
    
    message.channel.send(`Welcome Channel is seted as ${channel}`) //send success message
  }
}