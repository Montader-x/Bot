const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "roleCreate",
  async execute(client, role) {
    const w = await role.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");
    if(!webhook) return;
    const embed = new MessageEmbed()
      .setTitle("New role Created")
      .setDescription(`Role: **${role}** was created`)
      .setColor("GREEN")
      .setTimestamp();

    webhook.send(embed)
  },
};