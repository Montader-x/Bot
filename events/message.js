const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const queue = new Map()
const { ownerId } = require("../config.json")
module.exports = {
    name: "message",
    async execute(client, message, nolevel) {
      const prefix = db.get(`prefix_${message.guild.id}`);
      if(prefix === null) db.set(`prefix_${message.guild.id}`, "a!")
        if(!message.guild) return;
        if (message.channel.type === "dm") return;
      if(message.mentions.has(client.user) && !message.mentions.everyone){
        let mentionEmbed = new MessageEmbed()
        .setColor("BLACK")
        .setTitle("Bot Info")
        .setDescription("Information about me")
        .addFields({name: "Prefix: ", value: prefix},
        {name: "Need support?", value: "Join our [support server](https://discord.gg/cPD7ufj)"});
      
        message.channel.send(mentionEmbed);
      } 
      
        if (!message.content.startsWith(prefix)) return;
      
        if (!message.member)
          message.member = await message.guild.fetchMember(message);
      
        const args = message.content
          .slice(prefix.length)
          .trim()
          .split(/ +/g);
        const cmd = args.shift().toLowerCase();
        
        if (cmd.length === 0) return;
        // Get the command
        let command = client.commands.get(cmd);
        // If none is found, try to find it by alias
        if (!command) command = client.commands.get(client.aliases.get(cmd));
          if(message.author.bot) return;
           if (command) 
              command.run(client, message, args);
              
              }
    }