const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guildMemberAdd",
  async execute(client, member) {
    const user = client.users.cache.get(member.id);
    const membercount = member.guild.memberCount;
    let conf = await client.getConfig(member.guild);
    const welcomeChannel = conf.welcomeChannel;
    if (welcomeChannel === null || welcomeChannel === undefined) {
      return;
    }
    console.log(welcomeChannel);

    const embed = new MessageEmbed()
      .setTitle("👋 New Member!")
      .setDescription(`Welcome ${member} to ${member.guild.name}`)
      .setColor("BLUE")
      .setTimestamp()
      .addField(`membercount`, membercount)
      .setThumbnail(user.displayAvatarURL())
      .setImage("https://media.giphy.com/media/OkJat1YNdoD3W/giphy.gif")
      .setFooter(`UserId: ${member.id} - Tag: ${user.tag}`);

    client.channels.cache.get(welcomeChannel).send(embed);
    //! autorole here
    let autoRole = db.get(`welcomerole_${member.guild.id}`);
    if (autoRole === null || !autoRole) return;
    if (autoRole) {
      member.roles.add(autoRole.id);
    }
  },
};
