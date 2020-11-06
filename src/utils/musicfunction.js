module.exports = {
    canModifyQueue(member, message) {
      const { channel } = member.voice;
      const botChannel = member.guild.me.voice.channel;
  
      if (channel !== botChannel) {
        message.channel.send(`Hey ${member} join the voice channel first!`).catch(console.error);
        return false;
      }
  
      return true;
    }
  };