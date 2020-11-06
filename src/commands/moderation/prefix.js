const configModel = require("../../models/config");
const { default_prefix } = require("../../config.json");

module.exports = {
  name: "prefix",
  category: "moderation",
  usage: "prefix <new-prefix>",
  description: "Change the guild prefix",
  run: async (client, message, args) => {
    const config = await configModel.findOne({ GuildID: message.guild.id });
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "You are not allowed or do not have permission to change prefix"
      );
    }
    let prefix = args[0];

    if (!prefix) {
      await client.updateConfig(message.guild, { prefix: client.config.configDefaultSettings.prefix });
      message.channel.send("reseted prefix!");
    }
    if (prefix) {
      await client.updateConfig(message.guild, { prefix: prefix });
      await message.channel.send(`Prefix is now ${prefix}`);
    }
  },
};
