const { MessageEmbed } = require("discord.js");
const db = require('quick.db')

module.exports = {
  name: "guildMemberAdd",
  async execute(client, member) {
    let welcomeChannel = db.get(`welchannel_${member.guild.id}`);
  
    if(welcomeChannel === null) {
      return;
    }
    let autoRole = db.get(`welcomerole_${member.guild.id}`);
    if (autoRole === null || !autoRole) return;
  const wembed = new MessageEmbed()
        .setTitle("👋 New Member!")
        .setDescription(`Welcome ${member} to ${member.guild.name}`)
        .setColor("BLUE")
        .setTimestamp()
        .setThumbnail(member.user.displayAvatarURL())
        .setFooter(`memberId: ${member.id} - Tag: ${member.user.tag}`);
        member.roles.add(autoRole.id);
        client.channels.cache.get(welcomeChannel).send(wembed);


  }
}