
const db = require('quick.db')
const Discord = require('discord.js')
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "suggest",
  usage: "suggest <message>",
  description: "Send your Suggestion",
  category: "utility",
  run: (client, message, args) => {
        let sugChannel = db.get(`suggestchan_${message.guild.id}`);
  
     if(sugChannel === null) {
      return message.channel.send('The suggestion channel hasnt been set yet!')
    }
    
    if(!args.length) {
      return message.channel.send("Please Give the Suggestion")
    }

   
                                                    
    
    let embed = new MessageEmbed()
    .setAuthor("SUGGESTION: " + message.author.tag, message.author.avatarURL())
    .setThumbnail(message.author.avatarURL())
    .setColor("#ff2050")
    .setDescription(args.join(" "))
    .setTimestamp()
    
    

    
    
    client.channels.cache.get(sugChannel).send(embed).then(m => {
      m.react("✅")
      m.react("❌")
    })
    
  }
  
}