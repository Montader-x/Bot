const { MessageEmbed } = require("discord.js");
const db = require('quick.db');

module.exports = {
    name: "guildDelete",
    async execute(client, guild) {
        const logBed = new MessageEmbed()
        .setTitle(`i have been removed from ${guild}`)
        client.channels.cache.get('749358808337481811').send(logBed)


    }
}