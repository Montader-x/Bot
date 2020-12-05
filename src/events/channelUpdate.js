const logBed = require("../utils/logBed");
//its a line i forgot to remove dont mind it

module.exports = {
  name: "channelUpdate",
  async execute(client, oldChannel, newChannel) {
    if (!oldChannel.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await oldChannel.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    if (oldChannel.type !== newChannel.type) {
      const embed = logBed(client)
        .setTitle("Channel type is changed")
        .setDescription(`${oldChannel.name}'s type is now ${newChannel.type}`);
      webhook.send(embed);
    } else if (oldChannel.permissions !== newChannel.permissions) {
      const oldPermissions = oldChannel.permissions
        .toArray()
        .map((oldPermissions) => [oldPermissions]);
      const newPermissions = newChannel.permissions
        .toArray()
        .map((newPermissions) => [newPermissions]);
      const embed = logBed(client)
        .setTitle("Channel permissions changed!")
        .addField("Old permissions:", oldPermissions)
        .addField("New permissions", newPermissions);
      webhook.send(embed);
    } else if (oldChannel.name !== newChannel.name) {
      const e = logBed(client)
        .setTitle("Channel name changed")
        .setDescription(`${oldChannel.name} => ${newChannel.name}`);
      webhook.send(e);
    }
  },
};
