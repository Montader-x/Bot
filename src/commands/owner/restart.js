const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "restart",
  description: "restart to trigger people",
  category: "owner",
  botOwnersOnly: true,
  run: async (client, message, args) => {
    const msgBed = new MessageEmbed().setTitle("restarting....");
    const editedEmbed = new MessageEmbed().setTitle(`succesfully restarted`);
    const msg = message.channel.send(msgBed);
    process.exit(1).then(() => {
      msg.edit(editedEmbed);
    });
  },
};
