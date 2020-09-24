const { MessageEmbed } = require("discord.js");


module.exports = {
  name: "messageDelete",
  async execute(client, message) {
    client.snipes.set(message.channel.id,{
      content: message.content, 
      author: message.author, 
      image: message.attachments.first() ? message.attachments.first().proxyURL : null
    });
    if (!message.guild) return;
    if(!message) return;
    const w = await message.guild.fetchWebhooks()
    const webhook = w.find(w => w.name === "Andoi");
  const embed = new MessageEmbed()
  .setTitle("Message deleted")
  .setDescription(
    `Message: \`${message}\` was deleted in ${message.channel}`
  )
  .setColor("RED")
  .setTimestamp();
 if(message.author === null) return;
    if (message.author.id === client.user.id) return;
   webhook.send(embed)

}
}