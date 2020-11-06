const Discord = require("discord.js")

module.exports = {
  name: "setsuggest",
  category: "config",
  usage: "setsuggest <#channel>",
  description: "Set the suggestion channel",
  run: async (client, message, args) => {
    
		if(!message.member.hasPermission("ADMINISTRATOR"))
		return message.channel.send(`${message.author.tag} You don't have perms to do that.`);
		
    let channel = message.mentions.channels.first() //mentioned channel
    
    if(!channel) { //if channel is not mentioned
      return message.channel.send("Please Mention the channel first")
    }
    
    //Now we gonna use quick.db
    
    await client.updateConfig(message.guild, { suggestChan: channel.id });
    
    message.channel.send(`suggestion Channel is set as ${channel}`) //send success message
  }
}