const util = require("util");
const { MessageEmbed } = require('discord.js')
const { owners } = require("../../config.json");
module.exports = {
    name: "eval",
    description: "Eval",
    category: "owner",
    run: async (client, message, args) => {
      if (message.author.id !== owners[0] && message.author.id !== owners[1])
        return message.reply("Only the owner is allowed to run this command");
  
      const toEval = args.join(" ");
      if (!toEval) return message.channel.send("Please provide text");
  
      try {
        const evaluated = util.inspect(eval(toEval, { depth: 0 }));
  
        const embed = new MessageEmbed()
          .setTitle("Eval Command")
          .addField("**Input:**", `\`\`\`${toEval}\`\`\``)
          .addField("**Output:**", ` \`\`\`${evaluated}\`\`\``)
          .setColor("BLUE")
          .setTimestamp()
          .setFooter(message.author.username);
  
        message.channel.send(embed);
      } catch (e) {
        return message.channel.send(`Something went wrong!  \`\`\`${e}\`\`\`  `);
      }
    },
  };