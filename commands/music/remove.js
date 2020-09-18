const { canModifyQueue } = require("../../utils/musicfunction");
const { getServerPrefix } = require("../../utils/functions")
module.exports = {
  name: "remove",
  description: "Remove song from the queue",
  category: "music",
  run: (client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member)) return;
    const prefix = getServerPrefix(message.guild.id)
    if (!args.length) return message.reply(`Usage: ${prefix}remove <Queue Number>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${prefix}remove <Queue Number>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ removed **${song[0].title}** from the queue.`);
  }
};