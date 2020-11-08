const logBed = require("../utils/logBed");

module.exports = {
  name: "guildMemberUpdate",
  async execute(client, newMember, oldMember) {
    if (!newMember.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await newMember.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    if (!oldMember.guild) return;
    const avatar = newMember.user.displayAvatarURL({ dynamic: true });

    // not enabled

    const embed = logBed(client)
      .setAuthor(`${newMember.user.tag}`, avatar)
      .setTimestamp()
      .setColor("ORANGE");

    // Nickname change
    if (oldMember.nickname !== newMember.nickname) {
      // Get nickname log
      const oldNickname = oldMember.nickname || "`None`";
      const newNickname = newMember.nickname || "`None`";
      embed
        .setTitle("Member Update: `Nickname`")
        .setDescription(`${newMember}'s **nickname** was changed.`)
        .addField("Nickname", `${newNickname} ➔ ${oldNickname}`);

      // send message
      webhook.send(embed);
    }

    // Role add
    if (oldMember.roles.cache.size > newMember.roles.cache.size) {
      // Get role log
      const role = newMember.roles.cache
        .difference(oldMember.roles.cache)
        .first();
      embed
        .setTitle("Member Update: `Role Add`")
        .setDescription(`${newMember} was **given** the ${role} role.`);

      // send message
      webhook.send(embed);
    }

    // Role remove
    if (oldMember.roles.cache.size < newMember.roles.cache.size) {
      // Get role log
      const role = oldMember.roles.cache
        .difference(newMember.roles.cache)
        .first();
      embed
        .setTitle("Member Update: `Role Remove`")
        .setDescription(`${newMember} was **removed** from ${role} role.`);

      // send message
      webhook.send(embed);
    }
  },
};
