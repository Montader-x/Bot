const logBed = require("../utils/logBed");
//its a line i forgot to remove dont mind it

module.exports = {
  name: "channelUpdate",
  async execute(client, oldChannel, newChannel) {
    if (!oldChannel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await oldChannel.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    let msg = "";
    const type = oldChannel.type;
    let permissions;
    if (type === "category") {
      if (oldChannel.name !== newChannel.name) {
        msg = `Category **${newChannel}** was updated from \`${oldChannel.name}\` to \`${newChannel.name}\``;
      } else {
        msg = `Category: ${newChannel} was updated`;
      }
    } else {
      if (oldChannel.name !== newChannel.name) {
        msg = `Channel **${oldChannel.name}** was renamed to ${newChannel}`;
      } else if (oldChannel.topic !== newChannel.topic) {
        msg = `Channel topic in channel ${newChannel} was updated from \`${oldChannel.topic}\` to \`${newChannel.topic}\``;
      } else {
        msg = `Channel: ${newChannel} was updated`;
      }
    }

    const embed = logBed(client)
      .setTitle("Channel Updated")
      .setDescription(msg)
      .setColor("ORANGE")
      .setTimestamp();

    webhook.send(embed);
  },
};
