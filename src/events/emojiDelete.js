const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "emojiDelete",
  async execute(client, emoji) {
    const w = await emoji.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");
    if(!webhook) return;
    const embed = new MessageEmbed()
      .setTitle("Emoji Deleted")
      .setDescription(`Emoji: **${emoji}** was deleted`)
      .setColor("RED")
      .setTimestamp();

    webhook.send(embed)
  },
};