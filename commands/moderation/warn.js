const { MessageEmbed } = require("discord.js")
const warnModel = require('../../models/warn')
module.exports = {
  name: "warn",
  category: "moderation",
  usage: "warn <@mention> <reason>",
  description: "Warn anyone who do not obey the rules",
  run: async (client, message, args) => {
    
    if(!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You should have admin perms to use this command!")
    }
    
    const user = message.mentions.members.first()
    
    if(!user) {
      return message.channel.send("Please Mention the person to who you want to warn - warn @mention <reaosn>")
    }
    
    if(message.mentions.users.first().bot) {
      return message.channel.send("You can not warn bots")
    }
    
    if(message.author.id === user.id) {
      return message.channel.send("You can not warn yourself")
    }
    
    if(user.id === message.guild.owner.id) {
      return message.channel.send("You jerk, how you can warn server owner -_-")
    }
    
    const reason = args.slice(1).join(" ")
    
    if(!reason) {
      return message.channel.send("Please provide reason to warn - warn @mention <reason>")
    }
    
    let warnings = await warnModel.findOne({ GuildID: message.guild.id, UserID: user.id })
    
    if(warnings === 3) {
      return message.channel.send(`${message.mentions.users.first().username} already reached his/her limit with 3 warnings`)
    }
    
    if(warnings === null) {
      let aaa = new warnModel({
        GuildID: message.guild.id,
        UserID: user.id,
        reason: [`${reason}`],
        moderator: [`${message.author.username}`]
      })//kk
      aaa.save()
      user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)
    } else if(warnings !== null) {
        warnings.reason.push(reason)
        warnings.moderator.push(message.author.username)
        warnings.save()
       user.send(`You have been warned in **${message.guild.name}** for ${reason}`)
      await message.channel.send(`You warned **${message.mentions.users.first().username}** for ${reason}`)
    }
    
  
  } 
}