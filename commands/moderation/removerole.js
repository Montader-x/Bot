
module.exports = {
  name: "removerole",
  category: "moderation",
  description: "remove a role from mentioned user or with given id",
  aliases: ["rr"],
  usage: "removerole <role> <user> or removerole <id> <role>",
  run: async (client, message, args) => {
        if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        errorEmbed("i need manage roles permissions")
      );

    if (!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    const needsRole =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.get(args[0]);
    const role =
      message.guild.roles.cache.find(
        (role) => role.name === args.join(" ").slice(23)
      ) || message.mentions.roles.first();

    if (!needsRole) return message.channel.send("User wasn't found");
    if (!role) return message.channel.send("Please provide a valid role");

    needsRole.roles.remove(role.id);

    message.channel.send(
      `Successfully removed **${role.name}** from ${needsRole}`
    )
  }
}