const { MessageEmbed } = require("discord.js");
const { owners } = require("../../config.json");
module.exports = {
  name: "restart",
  description: "restart to trigger people",
  category: "owner",
  run: async (client, message, args) => {
    if (message.author.id !== owners[0] && message.author.id !== owners[1])
      return message.reply("Only the owner is allowed to run this command");
    const msgBed = new MessageEmbed().setTitle("restarting....");
    const editedEmbed = new MessageEmbed().setTitle(`succesfully restarted`);
    const msg = message.channel.send(msgBed);
    process.exit(1).then(() => {
      msg.edit(editedEmbed);
    });
  },
};
