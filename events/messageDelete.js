const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "messageDelete",
  async execute(client, message) {
    if (!message.guild) return;
    const w = await message.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");
  const embed = new MessageEmbed()
  .setTitle("Message deleted")
  .setDescription(
    `Message: \`${message}\` was deleted in ${message.channel}`
  )
  .setColor("RED")
  .setTimestamp();

    if (message.author.id === client.user.id) return;
   webhook.send(embed)
   
      
   
   

  }
};