const { MessageEmbed } = require("discord.js");
const { getAuditChannel } = require("../utils/functions");

module.exports = {
  name: "roleDelete",
  async execute(client, role) {
    const w = await role.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");
    if(!webhook) return;
    const embed = new MessageEmbed()
      .setTitle("Role deleted")
      .setDescription(`Role: **${role.name}** was deleted`)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed)
  },
};