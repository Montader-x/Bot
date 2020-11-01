const { getUserMoney, removeUserMoney } = require("../../utils/economy");

module.exports = {
  name: "rob",
  description: "Rob up to 1000coins from somebody",
  category: "economy",
  run: async (client, message, args) => {
    const user = message.mentions.users.first();
    const amount = Math.floor(Math.random() * 1000)
    if (!user) {
      return message.channel.send("Please provide a user mention");
    }

    if (user.id === message.author.id) {
      return message.channel.send("You can't rob yourself!");
    }
    
    const userId = user.id;
    const guildId = message.guild.id;
    let usersMoney = getUserMoney(guildId, userId);

    if (usersMoney === null) usersMoney = 0;

    if (usersMoney < 1) {
      return message.channel.send(
        "User doesn't have any money, therefor you can't rob this user."
      );
    }
    if(usersMoney < amount) return message.reply('This users money is lower than the amount you can rob!')

    removeUserMoney(guildId, userId, amount);

    return message.channel.send(
      `Successfully robbed **${amount}coins** from **${user.tag}**`
    );
  },
};