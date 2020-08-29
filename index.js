const {  default_prefix } = require("./config.json");
const { config } = require("dotenv");
const Discord = require("discord.js");
const fs = require('fs');
const enmap = require('enmap');
const keepAlive = require('./server.js');
const { Client, MessageEmbed } = require('discord.js');
const client = new Discord.Client({
  disableMentions: "everyone",
  partials: ['MESSAGE', 'REACTION', 'USER']
});


const token = require(`./token.json`);
const mongoose = require("mongoose");
mongoose.connect(token.Mongo, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const logs = require('discord-logs');
logs(client);

const db = require("quick.db") ;
//const { addexp } = require("./handlers/xp.js");
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();



const { GiveawaysManager } = require('discord-giveaways');
client.giveawaysManager = new GiveawaysManager(client, {
    storage: "./giveaways.json",
    updateCountdownEvery: 5000,
    default: {
        botsCanWin: false,
        embedColor: "#FF0000",
        reaction: "🎉"
    }
});






client.on("ready", () => {
  console.log(`Hi, ${client.user.username} is now online!`);
       setInterval(() => {
      const statuses = [
        ` ${client.guilds.cache.size} servers.`,
        `?help || ${client.channels.cache.size} channels`,
        `${client.users.cache.size} users`,
      ]
      const status = statuses[Math.floor(Math.random() * statuses.length)]
      client.user.setActivity(status, { type: "WATCHING"})
    }, 60000)
  
});



const guildInvites = new Map();

["command"].forEach(handler => { 
  require(`./handlers/${handler}`)(client);
})

client.on('inviteCreate', async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()))



client.on('guildCreate', (guild) => {

  let channelID
      let channels = guild.channels.cache
      channelLoop:
      for (let c of channels) {
        let channelType = c[1].type
        if (channelType === "text") {
            channelID = c[0]
            break channelLoop
          }
      }  
      let channel = client.channels.cache.get(guild.systemChannelID || channelID);

      channel.send("Thanks for adding me to your server for a list of my commands do ?help");
      const LogBed = new MessageEmbed()
      .setTitle(`i have joined ${guild}`)
      client.channels.cache.get('749358808337481811').send(LogBed)
})

client.on('message', async message => {
  if(!message.guild) return;
  let prefix = db.get(`prefix_${message.guild.id}`);
  if(prefix === null) db.set(`prefix_${message.guild.id}`, 
  default_prefix);
  
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

});
const TicketModel = require('./models/Ticket');
const { MessageReaction, User } = require("discord.js");
const ReactionModel = require("./models/ReactionRole");
client.on('guildMemberAdd', async member => {
    let welcomeChannel = db.get(`welchannel_${member.guild.id}`);
  
  if(welcomeChannel === null) {
    return;
  }
  let autoRole = db.get(`welcomerole_${member.guild.id}`);
  if (autoRole === null || !autoRole) return;
const wembed = new MessageEmbed()
      .setTitle("👋 New Member!")
      .setDescription(`Welcome ${member} to ${member.guild.name}`)
      .setColor("BLUE")
      .setTimestamp()
      .setThumbnail(member.user.displayAvatarURL())
      .setFooter(`memberId: ${member.id} - Tag: ${member.user.tag}`);
      member.roles.add(autoRole.id);
      client.channels.cache.get(welcomeChannel).send(wembed);
});

client.on('guildMemberRemove', async member => {
  let welcomeChannel = db.get(`welchannel_${member.guild.id}`);
  if(welcomeChannel === null) {
    return;
  }
  const lembed = new MessageEmbed()
    .setTitle("👋 Goodbye!")
    .setDescription(`member: ${member} has left ${member.guild.name}`)
    .setColor("BLUE")
    .setTimestamp()
    .setFooter(client.user.username);
    client.channels.cache.get(welcomeChannel).send(lembed);
})
client.on('messageDelete', message => {
    
		

   let logChannel = db.get(`logchannel_${message.guild.id}`);
   
    if(!logChannel) return;

    let deletedMessageEmbed = new MessageEmbed()
    .setColor('BLACK')
    .setTitle('Deleted Message')
    .setDescription('A message has been deleted.')
    .addFields({name: 'Author', value: message.member.user.tag, inline: true }, 
    {name: 'Channel', value: `#${message.channel.name} `, inline: true},
		{name: 'Message: ', value: message.content || 'Can\'t Display'})
    .setTimestamp();

    client.channels.cache.get(logChannel).send(deletedMessageEmbed);

 });

client.on('roleCreate', role =>{

let logChannel = db.get(`logchannel_${role.guild.id}`);

if(!logChannel) return;

let roleCreatedEmbed = new MessageEmbed()
.setColor('BLACK')
.setTitle('Role Created')
.setDescription('A new role has been made.')
.addFields({name: 'Role Name: ', value: role.name, inline: true},
{name: 'Role ID: ', value: role.id, inline: true})
.setTimestamp();

client.channels.cache.get(logChannel).send(roleCreatedEmbed);
});

client.on('roleDelete', role => {

let logChannel = db.get(`logchannel_${role.guild.id}`);

if(!logChannel) return;

let roleDeleteEmbed = new MessageEmbed()
.setColor('BLACK')
.setTitle('Role Deleted')
.setDescription('A role has been deleted')
.addFields({name: 'Role Name: ', value: role.name, inline: true},
{name: 'Role ID: ', value: role.id})
.setTimestamp();

client.channels.cache.get(logChannel).send(roleDeleteEmbed);
});

client.on('messageUpdate', (oldMessage, newMessage) => {

if(newMessage.author === null) return;

let logChannel = db.get(`logchannel_${newMessage.guild.id}`);

if(!logChannel) return;

if (newMessage.author.id === client.user.id) return
if(newMessage.content === oldMessage.content) return;

let messageEditEmbed = new MessageEmbed()
.setColor('BLACK')
.setTitle('Message Edited')
.setDescription("A message has been edited")
.addFields({name: 'Message Author: ', value: `${newMessage.author.tag}(${newMessage.author.id})`}, 
{name: "Message Link: ", value: newMessage.url, inline: true},
{name: "Message ID: ", value: newMessage.id, inline: true},
{name: "Message Before: ", value: oldMessage.content || 'Can\'t Display' },
{name: "Message After: ", value: newMessage.content || 'Can\'t Display'})
.setTimestamp();

client.channels.cache.get(logChannel).send(messageEditEmbed);
});

client.on('emojiCreate', (emoji) => {
  let logChannel = db.get(`logchannel_${emoji.guild.id}`);
  if(!logChannel) return;
  
  const emojiBed = new MessageEmbed()
      .setTitle("New Emoji Created")
      .setDescription(`Emoji: **${emoji}** was created`)
      .setColor("GREEN")
      .setTimestamp();
      client.channels.cache.get(logChannel).send(emojiBed);

});

client.on('channelCreate', channel => {
	let logChannel = db.get(`logchannel_${channel.guild.id}`);
  if(!logChannel) return;

	let channelCreateEmbed = new MessageEmbed()
	.setColor("BLACK")
	.setTitle("Channel Created")
	.setDescription("A new channel has been created")
	.addFields({name: "Channel: ", value: `${channel.name}(${channel.id})`})
  .setTimestamp();

  client.channels.cache.get(logChannel).send(channelCreateEmbed);
});

client.on('channelDelete', channel => {
	let logChannel = db.get(`logchannel_${channel.guild.id}`);
  if(!logChannel) return;

	let channelDeleteEmbed = new MessageEmbed()
	.setColor("BLACK")
	.setTitle("Channel Deleted")
	.setDescription("A channel has been deleted")
	.addFields({name: "Channel: ", value: `${channel.name}(${channel.id})`})
  .setTimestamp();

  client.channels.cache.get(logChannel).send(channelDeleteEmbed);
});
client.on('emojiDelete', (emoji) => {
  let logChannel = db.get(`logchannel_${emoji.guild.id}`);
  if(!logChannel) return;
const EmojDembed = new MessageEmbed()
      .setTitle("Emoji Deleted")
      .setDescription(`Emoji: **${emoji}** was deleted`)
      .setColor("RED")
      .setTimestamp();
      client.channels.cache.get(logChannel).send(EmojDembed)
});
client.on('guildBanAdd', (guild, user) => {
  let logChannel = db.get(`logchannel_${guild.id}`);
  if(!logChannel) return;
  
	let Banbed = new MessageEmbed()
  .setTitle("Member Banned")
  .setDescription(`${user.tag} has been banned from ${guild.name}.`)
  .setColor("RED")
  .setThumbnail(user.displayAvatarURL())
  .setTimestamp();

  client.channels.cache.get(logChannel).send(Banbed)
});
client.on('guildBanRemove', (guild, user) => {
  let logChannel = db.get(`logchannel_${guild.id}`);
  if(!logChannel) return;
  
	let unBanbed = new MessageEmbed()
  .setTitle("Member Unbanned")
  .setDescription(`${user.tag} has been unbanned from ${guild.name}.`)
  .setColor("RED")
  .setThumbnail(user.displayAvatarURL())
	.setTimestamp();
	
  client.channels.cache.get(logChannel).send(unBanbed)
});
client.on('messageReactionAdd ', async (reaction, user) => {
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
  
        } else {
      TicketModel.findOne(
      {
        Guild: reaction.messsage.guild.id,
        MessageID: reaction.message.id,
        Reaction:  "✉️",
      },
    
    
    
     
     
              reaction.users.remove(user))

   const channel = await reaction.message.guild.channels.create(`ticket-${user.username}`, {
  type: 'text',
  permissionOverwrites: [
     {
       id: user.id,
       allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],

       id: reaction.message.guild.roles.everyone,
       deny: ['VIEW_CHANNEL'],
      
    },
  ],
   
  }).then(async channel => {
    channel.send('staff will be here soon')
  })
  }
}
})
})


      
    
  

client.on('messageReactionRemove', (reaction, user) => {
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
        if (member.roles.cache.has(data.Role)) {
          member.roles.remove(data.Role);
        } else {
        }
      }
    }
  );
});
client.on("guildMemberRoleAdd", (member, role) => {
  let logChannel = db.get(`logchannel_${member.guild.id}`);
  if(!logChannel) return;
  let roleAddbed = new MessageEmbed()
  .setTitle(`Role added to ${member.displayName}!`)
  .addField(`added role:`, `${role}` )
  client.channels.cache.get(logChannel).send(roleAddbed)

});
client.on("guildMemberRoleRemove", (member, role) => {
   let logChannel = db.get(`logchannel_${member.guild.id}`);
  if(!logChannel) return;
  let roleRedbed = new MessageEmbed()
  .setTitle(`Role removed from ${member.displayName}!`)
  .addField(`removed role:`, `${role}` )
  client.channels.cache.get(logChannel).send(roleRedbed)
});

/*client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions) => {
     let logChannel = db.get(`logchannel_${channel.guild.id}`);
    if(!logChannel) return;
    let ChannelPermUpbed = new MessageEmbed()
    .setTitle(`${channel.name} updated!`)
    .addField(`old permissions:`, require('util').inspect(oldPermssions))


    client.channels.caissions))
    .addField(`new premissions`, require('util').inspect(newPermiche.get(logChannel).send(ChannelPermUpbed)
});*/

keepAlive();
client.login(token.Token);