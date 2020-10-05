const Discord = require("discord.js")
const db = require('quick.db')
module.exports = {
  name: "setlog",
  category: "config",
  usage: "setlog <#channel>",
  description: "Set the log channel",
  run: async (client, message, args) => {
		if(!message.member.hasPermission("ADMINISTRATOR") && message.author.id !== '556218750337286145')
		return message.channel.send(`${message.author.tag} You don't have perms to do that.`);
    const w = await message.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");
    let channel = message.mentions.channels.first() //mentioned channel
    
    if(!channel) { //if channel is not mentioned
      if(!webhook) { return } else { webhook.delete({reason: "Idk"})
         message.channel.send("Reseted logs")}
    } else {
    //Now we gonna use quick.db
    
    channel.createWebhook('Andoi', {
      avatar: 'https://cdn.discordapp.com/attachments/740682998587850792/756802391600529418/andi.png',
      channel: channel
    })

  
    
    message.channel.send(`Done! setted log channel to ${channel}`) //send success message
  }
  }
}