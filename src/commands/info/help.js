const { MessageEmbed } = require("discord.js");
const Invite =
  "https://discord.com/api/oauth2/authorize?client_id=728694375739162685&permissions=0&scope=bot";

module.exports = {
  name: "help",
  description:
    "Get list of all command and even get to know every command detials",
  usage: "help <cmd>",
  category: "info",
  run: async (client, message, args) => {
    const e = await client.getConfig(message.guild);
    const prefix = e.prefix;
    if (args[0]) {
      const command = await client.commands.get(args[0]);

      if (!command) {
        return message.channel.send("Unknown Command: " + args[0]);
      }

      let embed = new MessageEmbed()
        .setAuthor(command.name, client.user.displayAvatarURL())
        .addField("Description", command.description || "Not Provided")
        .addField("Usage", "`" + command.usage + "`" || "Not Provied")
        .addField(
          "aliases",
          command.aliases ? "`" + command.aliases + "`" : "not provided"
        )
        .addField("cooldown", command.cooldown ? command.cooldown : "None")
        .setThumbnail(client.user.displayAvatarURL())
        .setColor("GREEN")
        .setFooter(client.user.username, client.user.displayAvatarURL());

      return message.channel.send(embed);
    } else {
      const commands = await client.commands;
      //prefix variable is prefix
      let emx = new MessageEmbed()
        .setDescription("these are my commands")
        .setColor("GREEN")
        .setFooter(`do ${prefix}help <command name> for more info.`)
        .addField(
          "need support?",
          `[Join our support server](https://discord.gg/jqm4Ybh) | [or invite me](${Invite})`
        )
        .setThumbnail(client.user.displayAvatarURL());

      let com = {};
      for (let comm of commands.array()) {
        let category = comm.category || "Unknown";
        let name = comm.name;

        if (!com[category]) {
          com[category] = [];
        }
        com[category].push(name);
      }

      for (const [key, value] of Object.entries(com)) {
        let category = key;

        let desc = "```" + value.join(", ") + "```";

        emx.addField(`${category.toLowerCase()}[${value.length}]`, desc);
      }

      return message.channel.send(emx);
    }
  },
};
