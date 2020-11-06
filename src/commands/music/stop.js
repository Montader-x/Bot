const { canModifyQueue } = require("../../utils/musicfunction");


module.exports = {
  name: "stop",
  description: "Stops the music",
  category: "music",
  run: (client, message, args) => {
    const queue = message.client.queue.get(message.guild.id);
    
    if (!queue) return message.reply("There is nothing playing.").catch(console.error);
    if (!canModifyQueue(message.member, message)) return;

    queue.songs = [];
    queue.connection.dispatcher.end();
    queue.textChannel.send(`${message.author} ⏹ stopped the music!`).catch(console.error);
  }
};