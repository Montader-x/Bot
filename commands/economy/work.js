const db = require('quick.db')
const Discord = require('discord.js')
module.exports = {
    name: "work",
    description: "work for economy",
    category: "economy",
    usage: "work",
    aliases: ["w"],
    run:  async (client, message, args, color) => {


    
     if (args[0] == 'prostitute') {//WTF

        let amount = Math.floor(Math.random() * 500) + 1; // 1-500 random number. whatever you'd like

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`${message.author}, you coded an awesome bot for someone and got payed ${amount}$ `)
        .setColor("RANDOM")
        
    
        message.channel.send(embed)
        db.add(`money_${message.author.id}`, amount)
     } else if(args[0] == 'constructor') {
        let amount = Math.floor(Math.random() * 500) + 1; // 1-500 random number. whatever you'd like

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`${message.author}, you worked as a constructor & got payed ${amount}$ for rebuilding the empire state building.`)
        .setColor("RANDOM")
        
    
        message.channel.send(embed)
        db.add(`money_${message.author.id}`, amount)
    } else if(args[0] == 'programmer') {
        let amount = Math.floor(Math.random() * 500) + 1; // 1-500 random number. change to whatever you'd like

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL) 
        .setDescription(`${message.author}, you worked as a programmer for epicgames, you fixed their game & earned ${amount}$!`)
        .setColor("RANDOM")
        
    
        message.channel.send(embed)
        db.add(`money_${message.author.id}`, amount)
    }




  
    
    let amount = Math.floor(Math.random() * 500) + 1; 
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag}, it payed off!`, message.author.displayAvatarURL) 
    .setDescription(`${message.author}, you've worked and earned ${amount}$ !`)
    .setColor("RANDOM")
    
    message.channel.send(embed)
    db.add(`money_${message.author.id}`, amount)
    

 }
}