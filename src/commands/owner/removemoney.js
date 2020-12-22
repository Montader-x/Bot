const { removeUserMoney } = require("../../utils/economy");

module.exports = {
  name: "removemoney",
  description: "Remove money from a user",
  category: "owner",
  botOwnersOnly: true,
  async execute(client, message, args) {
    const member = message.guild.members.cache.find(args[0]);
    const amount = args[1];

    if (!member) {
      return message.channel.send("Please provide a member");
    }

    if (member.user.bot) {
      return message.channel.send("That user is a bot");
    }

    if (!amount) {
      return message.channel.send("Please give an amount to remove");
    }

    message.channel.send(
      `Removed ${amount} money from ${member.user.username}`
    );
    await removeUserMoney(member.user.id, amount);
  },
};
