const { MessageReaction, User} = require("discord.js");
const ReactionModel = require("../models/ReactionRole");
const Discord = require('discord.js')
const db = require('quick.db')
/**
 *
 * @param {MessageReaction} reaction
 * @param {User} user
 */
module.exports = {
    name: "messageReactionAdd",
    async execute(client, reaction, user) {
      if(user.partial) await user.fetch();
      if(reaction.partial) await reaction.fetch();
      if(reaction.message.partial) await reaction.message.fetch();
  
      if(user.bot) return;
  
      let ticketid = await db.get(`ticketMessageId_${reaction.message.guild.id}`);
      
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
              channel.send(`${user}`, new Discord.MessageEmbed().setTitle("Welcome to your ticket!").setDescription("We will be with you shortly").setColor("00ff00")).then(async (msg, client)=> {
                msg.react("🔒")
                db.set(`TicketmsgID_${msg.id}`, msg.id)
              })
          
          
            })
        
            } else if(reaction.message.id === ticketmsg && reaction.emoji.name === "🔒") {
              reaction.message.channel.delete();
            } else {
              let member = reaction.message.guild.members.cache.get(user.id);
              ReactionModel.findOne(
                {
                  Guild: reaction.message.guild.id,
                  Reaction: reaction.emoji.toString(),
                  MessageID: reaction.message.id,
                },
                async (err, data) => {
                  if (err) throw err;
                  if (data) {
                    if (!member.roles.cache.has(data.Role)) {
                      member.roles.add(data.Role);
              
              
            }
          }
        }
      );
    }
  }
}