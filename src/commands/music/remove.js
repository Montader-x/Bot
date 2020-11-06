const { canModifyQueue } = require("../../utils/musicfunction");
module.exports = {
  name: "remove",
  description: "Remove song from the queue",
  category: "music",
  run: async (client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    if (!queue) return message.channel.send("There is no queue.").catch(console.error);
    if (!canModifyQueue(message.member, message)) return;
    const prefix = await client.getConfig(message.guild)
    if (!args.length) return message.reply(`Usage: ${prefix.prefix}remove <Queue Number>`);
    if (isNaN(args[0])) return message.reply(`Usage: ${prefix.prefix}remove <Queue Number>`);

    const song = queue.songs.splice(args[0] - 1, 1);
    queue.textChannel.send(`${message.author} ❌ removed **${song[0].title}** from the queue.`);
  }
};