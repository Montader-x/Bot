const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "setleavemsg",
  category: "config",
  description: "Changes the leave message.",
  aliases: ["swm"],
  usage: "setleavemsg <msg>",
  run: async (client, message, args) => {
    if (message.member.hasPermission("MANAGE_CHANNELS"))
      return message.reply("You need `MANAGE_CHANNELS` permission to use this");

    const filter = (user) => user.id === message.author.id;
    message.channel.send(
      `Alright you can now send your leave msg available params are: {user.username}, {user}, {user.id}, {user.tag}, {server}, {server.members}. `
    );
    const messages = await message.channel
      .awaitMessages(filter, { time: 36000, errors: ["time"], max: 1 })
      .then(async (collected) => {
        const msg = collected.first();
        client.updateConfig(message.guild, { leavemsg: msg });
        const e = new MessageEmbed()
          .setTitle("Succes!")
          .setDescription(`The leave message is now ${msg}`);
        message.channel.send(e);
      });
    if (!messages.size) {
      client.updateConfig(message.guild, {
        leavemsg:
          "Welcome {user.username} to {server}, hope you have a good time!",
      });
      message.channel.send("Time is up welcome message has been resetted");
    }
  },
};
