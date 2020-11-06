const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guildBanRemove",
  async execute(client, guild, user) {
    const w = await guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;

    const embed = new MessageEmbed()
      .setTitle("User unbanned!")
      .setDescription(`${user.username} has been unbanned in ${guild.name}`);
    webhook.send(embed);
  },
};
