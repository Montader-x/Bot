const { MessageReaction, User, MessageAttachment } = require("discord.js");
const Discord = require('discord.js')
const db = require('quick.db')
const fs = require('fs')
const fetchAll = require('discord-fetch-all');
/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 */
module.exports = {
    name: "messageReactionAdd",
    async execute(client, reaction, user) {
      const { message } = reaction;

      if(user.partial) await user.fetch();
      if(reaction.partial) await reaction.fetch();
      if(reaction.message.partial) await reaction.message.fetch();
  
      if(user.bot) return;
      let verifyChannel = await db.get(`verifyChan_${message.guild.id}`)
      let ticketid = await db.get(`ticketMessageId_${reaction.message.guild.id}`);
      let verification = await db.get(`Verifymsgid_${message.guild.id}`)
      let verificationRole = await db.get(`verificationRole_${message.guild.id}`)
      if(!ticketid) return;
      const ticketmsg = await db.get(`TicketmsgID_${reaction.message.id}`)
      if(reaction.message.id == ticketid && reaction.emoji.name == '🎫') {
          reaction.users.remove(user);
          
  
          reaction.message.guild.channels.create(`ticket-${user.username}`, {
              permissionOverwrites: [
                  {
                      id: user.id,
                      allow: ["SEND_MESSAGES", "VIEW_CHANNEL"]
                  },
                  {
                      id: reaction.message.guild.roles.everyone,
                      deny: ["VIEW_CHANNEL"]
                  }
              ],
              type: 'text'
          }).then(async channel => {
              channel.send(user.toString(), new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("00ff00").setFooter("📰 for ticket transcript, 🔒 to close ticket")).then(async (msg, client)=> {
                msg.react("🔒")
                db.set(`TicketmsgID_${msg.id}`, msg.id)
              })
          
          
            })
        
            } else if(reaction.message.id === ticketmsg && reaction.emoji.name === "🔒") {
              reaction.message.channel.delete();
            }
  }
}