const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleUpdate",
  async execute(client, oldRole, newRole) {
    const w = await oldRole.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");

    let msg = "";
    if (oldRole.name !== newRole.name) {
      msg = `Role: **${oldRole.name}** was renamed to **${newRole.name}** (${newRole})`;
    } {
      msg = `Role: **${newRole.name}** was updated (${newRole})`;
    }

    const embed = new MessageEmbed()
      .setTitle("Role Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed)
  },
};