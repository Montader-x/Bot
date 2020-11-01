const { MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: "messageUpdate",
  async execute(client, oldMsg, newMsg) {
    if (!newMsg.guild) return;
    const w = await oldMsg.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");
    if(!webhook) return;
    

    // not enabled

    
      
      if (newMsg.author.id === client.user.id) return;
      if(newMsg.content === oldMsg.content) return;

    const embed = new MessageEmbed()
      .setTitle(`Message updated in **${newMsg.channel.name}**`)
      .setDescription(`Message send by **${newMsg.author.tag}** was edited`)
      .addField("**Old Message**", oldMsg)
      .addField("**New Message**", newMsg)
      .setColor("ORANGE")
      .setTimestamp();
     webhook.send(embed)
    
  },
};