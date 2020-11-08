const logBed = require("../utils/logBed");

module.exports = {
  name: "roleUpdate",
  async execute(client, oldRole, newRole) {
    if (!oldRole.guild.me.hasPermission("MANAGE_WEBHOOKS")) return;
    const w = await oldRole.guild.fetchWebhooks();
    const webhook = w.find((w) => w.name === "Andoi");
    if (!webhook) return;
    let msg = "";
    if (oldRole.name !== newRole.name) {
      msg = `Role: **${oldRole.name}** was renamed to **${newRole.name}** (${newRole})`;
    }
    {
      msg = `Role: **${newRole.name}** was updated (${newRole})`;
    }

    const embed = logBed(client).setTitle("Role Updated").setDescription(msg);

    webhook.send(embed);
  },
};
