const Discord = require("discord.js")
const db = require('quick.db')
module.exports = {
  name: "setlog",
  category: "config",
  usage: "setlog <#channel>",
  description: "Set the log channel",
  run: (client, message, args) => {
		if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== '556218750337286145')
		return message.channel.send(`${message.author.tag} You don't have perms to do that.`);
		
    let channel = message.mentions.channels.first() //mentioned channel
    
    if(!channel) { //if channel is not mentioned
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db

    
    
    message.channel.send(`log Channel is set as ${channel}`) //send success message
  }
}