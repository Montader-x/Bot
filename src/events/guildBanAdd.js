const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guildBanAdd",
  async execute(client, guild, user) {
    const w = await guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;

    const embed = new MessageEmbed()
      .setTitle("User banned!")
      .setDescription(`${user.username} has been banned in ${guild.name}`);
    webhook.send(embed);
  },
};
