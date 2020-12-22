const { getUserMoney, addUserMoney } = require("../../utils/economy");

module.exports = {
  name: "addmoney",
  description: "Add money to a user",
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
      return message.channel.send("Please give an amount to give");
    }

    message.channel.send(`Added ${amount} money to ${member.user.username}`);
    await addUserMoney(member.user.id, amount);
  },
};
