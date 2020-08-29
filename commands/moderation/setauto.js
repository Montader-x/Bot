const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setautor",
  category: "config",
  usage: "setautor <@role>",
  description: "Set the welcome channel",
  run: (client, message, args) => {
    
		if(!message.member.hasPermission("ADMINISTRATOR"))
		return message.channel.send(`${message.author.tag} You don't have perms to do that.`);
    let role = message.mentions.roles.first() //mentioned channel
    
    if(!role) { //if channel is not mentioned
      return message.channel.send("Please Mention the role first")
    }
    
    //Now we gonna use quick.db
    
      db.set(`welcomerole_${message.guild.id}`, role); //set id in var
    
    message.channel.send(`auto Role is seted as ${role}`) //send success message
  }
}