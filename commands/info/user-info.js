const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "userinfo",
    description: "get info about an user",
    category: "info",
    aliases: ["whois"],
    usage: "userinfo <user>",
    run: async (client, message, args) => {
   const member =
      message.guild.members.cache.get(args.join(" ")) ||
      message.mentions.members.first() ||
      message.member;

    if (!member) return message.channel.send("User wasn't found!");

    const joinedAt = member.joinedAt.toLocaleDateString("en-us");
    const createdAt = member.user.createdAt.toLocaleDateString("en-us");
    const avatar = member.user.displayAvatarURL();
    const roles =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .map((r) => r)
        .join(", ") || "None";
    const roleCount = member.roles.cache.filter(r => r.id !== message.guild.id).size;
    const { username, id, tag } = member.user;

    const embed = new MessageEmbed()
      .addField("**Id**", id, true)
      .addField("**Username**", username, true)
      .addField("**Tag**", tag, true)
      .addField("**Created At**", createdAt, true)
      .addField("**Joined At**", joinedAt, true)
      .addField(`**Roles (${roleCount})**`, roles)
      .setTitle(`${username}'s info`)
      .setColor("BLUE")
      .setThumbnail(avatar, { dynamic: true })
      .setTimestamp()
      .setFooter(message.author.username);

    message.channel.send(embed);
    }
}