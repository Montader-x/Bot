const db = require('quick.db')
const { MessageEmbed } = require('discord.js')
const { ownerId } = require("../config.json")
const Levels = require("discord-xp");
const configModel = require('../models/config')
module.exports = {
    name: "message",
    async execute(client, message) {
      if (message.channel.type === "dm") return;
      //hey can u add me to the database
     const config = await configModel.findOne({ GuildID: message.guild.id})
     if(!config) {
       const aaa = new configModel({
         GuildID: message.guild.id
       })
       aaa.save()
     }
      const randomAmountOfXp = Math.floor(Math.random() * 29) + 1; // Min 1, Max 30
      const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp);
      if(config.levelMessage === true) {
      if(hasLeveledUp) {
        const user = await Levels.fetch(message.author.id, message.guild.id);
        message.channel.send(`${message.author}, congratulations! You have leveled up to **${user.level}**. :tada:`);
      }
      }
      const prefix = db.get(`prefix_${message.guild.id}`);
      if(prefix === null) db.set(`prefix_${message.guild.id}`, "a!")
        if(!message.guild) return;
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
        const cmd = args.shift();
        
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
    