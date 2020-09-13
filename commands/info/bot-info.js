const { MessageEmbed, user } = require('discord.js')
const os = require('os')
const ms = require('ms')
const cpuStat = require('cpu-stat')
const Discord = require('discord.js')
module.exports = {
    name: "botinfo",
    description: "get info about the  bot",
    category: "info",
    usage: "botinfo",
    run: async (client, message, args) => {
      let user = client.user
       let core = os.cpus()[0];
        let embedStats = new MessageEmbed()
            // .setAuthor(this.client.user.username)
            .setTitle("__**Stats:**__")
            .setColor("BLUE")
            .addField('**General**', [
                `**Client:** ${client.user.tag}\n(${client.user.id})`,
                `**Commands:** ${client.commands.size}`,
                `**Users:** ${client.users.cache.size}`,
                `**Servers:** ${client.guilds.cache.size}`,
                `**Channels:** ${client.channels.cache.size}`,
                `**NodeJS:** ${process.version}`,
                `**Client Uptime:** ${ms(client.uptime, {long: true})}`,
                '\u200b',
                `**source code:** [click here](https://www.youtube.com/watch?v=dQw4w9WgXcQ)`

            ], true)
            .addField('**System**', [
                `\u3000 **Uptime:** ${ms(client.uptime, { long: true})}`,
                `**CPU:**`,
                `\u3000 **Cores:** ${os.cpus().length}`,
                `\u3000 **Model:** ${core.model}`,
                `\u3000 **Speed:** ${core.speed}Mhz`,
                '\u200b'
            ], true)
            .setFooter("andoi's stats")
        message.channel.send(embedStats)
    } 
}