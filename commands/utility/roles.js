const { MessageEmbed } = require('discord.js')
module.exports = {
    name: "roles",
    description: "See all the roles for this server",
    category: "utility",
    run: async (client, message) => {
        const roles = message.guild.roles.cache
        .filter(r => r.id !== message.guild.id)
        .map(r => r)
        .join(",\n") || "None";

    const embed = new MessageEmbed()
        .setTitle(`${message.guild.name}'s Roles`)
        .addField("Roles:", `${roles}`)
        .setTimestamp()
        .setFooter(message.author.username)
        .setColor("BLUE");

    message.channel.send(embed);
    }
}