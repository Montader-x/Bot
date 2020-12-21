const { MessageEmbed } = require("discord.js");
module.exports = {
  name: "guildCreate",
  async execute(client, guild) {
    const LogBed = new MessageEmbed()
      .setTitle(`New server ${guild.name} here is some info!`)
      .addField("Owner", guild.owner.tag)
      .addField("MemberCount", guild.memberCount);

    const w = await client.guilds.cache
      .get("740295580886106233")
      .fetchWebhooks();
    const webhook = w.find((w) => w.name === "Guild log");
    webhook.send(LogBed);
    const newConfig = {
      GuildID: guild.id,
    };
    await client.createConfig(newConfig).catch((err) => console.log(err));
  },
};
